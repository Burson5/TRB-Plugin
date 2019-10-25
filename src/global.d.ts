declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.conf' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  const content: any;
  export default content;
}

// axios请求
interface HttpRequestData {
  ret: number;
  msg: string;
  data?;
}
