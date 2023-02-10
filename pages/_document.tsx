import Document, { DocumentContext } from "next/document";

//@ts-ignore
import bundleCss from "!raw-loader!../styles/tailwindSSR.css"; //빌드한거 import

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        initialProps.styles,

        <style
          key="custom"
          dangerouslySetInnerHTML={{
            __html: bundleCss,
          }}
        />,
      ],
    };
  }
}
