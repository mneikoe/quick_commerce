import React from "react";

const Image = ({
  src,
  srcSet = "",
  sizes = "100vw",
  alt,
  width,
  height,
  aspectRatio = "4/3",
  sources = [],
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
