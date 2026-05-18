import Image from "next/image";

type SpecialistAvatarProps = {
  name: string;
  avatarColor: string;
  avatarImage?: string | null;
};

export const SpecialistAvatar = ({
  name,
  avatarColor,
  avatarImage,
}: SpecialistAvatarProps) => {
  const firstLetter = name?.charAt(0)?.toUpperCase() || "D";

  return (
    <div
      className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center text-white shadow-inner flex-shrink-0"
      style={{
        background: avatarColor,
        boxShadow:
          "inset 0px 2px 4px rgba(255,255,255,0.4), inset 0px -2px 4px rgba(0,0,0,0.2)",
      }}
    >
      {avatarImage ? (
        <Image
          src={avatarImage}
          alt={name}
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-base md:text-lg font-bold">{firstLetter}</span>
      )}
    </div>
  );
};
