import React from "react";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt, className = "" }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskComposite: "source-in",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskComposite: "intersect",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          filter: "grayscale(45%) contrast(1.05) brightness(0.9)",
          mixBlendMode: "luminosity",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,20,22,0) 0%, rgba(20,184,166,0.15) 55%, rgba(10,14,15,0.85) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};

export default ProfilePhoto;