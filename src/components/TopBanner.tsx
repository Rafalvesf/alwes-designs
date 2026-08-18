export default function TopBanner() {
  return (
    <div className="sticky top-0 inset-x-0 z-10 flex items-center justify-center bg-[#212121] py-3">
      <img
        src={`${import.meta.env.BASE_URL}alwes-logo.png`}
        alt="ALWES"
        className="h-5 sm:h-6"
      />
    </div>
  );
}
