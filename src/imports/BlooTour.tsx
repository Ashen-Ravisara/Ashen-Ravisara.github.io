import imgBlooTour from "figma:asset/39290fd8ff4982636c4862da5fc112cbf6c51e60.png";

export default function BlooTour() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat size-full"
      data-name="bloo tour"
      style={{ backgroundImage: `url('${imgBlooTour}')` }}
    />
  );
}