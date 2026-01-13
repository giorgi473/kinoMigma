import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute w-full h-full">
        <Image
          src={"/authImageScreen/image19.svg"}
          alt="image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
