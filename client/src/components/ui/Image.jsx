import React from "react";
// server side par multiple size image  upload
const Image = ({
  src,
  srcSet = "", // comma-separated srcset string
  sizes = "100vw", // default sizes
  alt,
  width,
  height,
  aspectRatio = "4/3",
  sources = [], // source objects for <picture> (webp, avif, etc.)
  className = "",
  style = {},
  loading = "lazy",
  placeholder = "#f3f3f3",
  objectFit = "cover",
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: width || "100%",
        aspectRatio,
        backgroundColor: placeholder,
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
          />
        ))}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={loading}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </picture>
    </div>
  );
};

export default Image;
