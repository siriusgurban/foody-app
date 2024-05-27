declare module 'aos' {
    interface AosOptions {
      duration?: number;
      delay?: number;
      easing?: string;
      once?: boolean;
      mirror?: boolean;
      anchorPlacement?: string;
    }
  
    declare const AOS: {
      init(options?: AosOptions): void;
      refresh(): void;
    };
  
    export default AOS;
  }
  