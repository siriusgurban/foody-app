import { useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fileStorage } from '@/server/configs/firebase'

export function useImageUpload(initUrl: string = '') {
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState<string>(initUrl)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  function getImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0]
    console.log(e?.target?.files?.[0], 'eeeeeeee')

    if (!file) {
      return
    }
    setSelectedImage(file)

    const name = e?.target?.files?.[0]?.name
    console.log(e?.target?.files?.[0]?.name, 'eeeeeeee')

    if (!name) {
      return
    }
  }
  useEffect(() => {
    async function uploadImage() {
      if (!selectedImage) return

      const imageRef = ref(fileStorage, `files/images/${Date.now()}`)

      try {
        setLoading(true)
        console.log(loading, 'loadingloading')

        const snapshot = await uploadBytes(imageRef, selectedImage)
        const url = await getDownloadURL(snapshot.ref)
        setImgUrl(url)
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setLoading(false)
      }
    }

    uploadImage()
  }, [selectedImage])

  return { loading, imgUrl, getImage }
}
