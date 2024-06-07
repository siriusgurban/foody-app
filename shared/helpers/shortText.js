export const shortText = (num, title) => {
   // console.log("title.title", title?.length)
    return title?.length >= num ? title.slice(0, num) + "..." : title;
};