import imgImage from "figma:asset/ec4e1da591c7b82a0f5f557928c4068072447f0c.png";
import imgImage1 from "figma:asset/cf23f4bff6fc8e67da8f1ca8ad1c59b6587659ee.png";
import imgImage2 from "figma:asset/29a958d13e3650a1f63af7d034ff23ce86ecf0f0.png";
import imgImage3 from "figma:asset/7d99b0828d4f8ab6cddb607404ac4fa377e7ceb1.png";

export default function UbWeb() {
  return (
    <div
      className="backdrop-blur-[2px] backdrop-filter bg-[#121619] relative rounded-lg size-full"
      data-name="UB Web"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-start p-[32px] relative size-full">
          <div
            className="flex flex-col font-['Annapurna_SIL:Bold',_sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left"
            style={{ width: "min-content" }}
          >
            <p className="block leading-[30px]">Web Designs</p>
          </div>
          <div
            className="bg-center bg-contain bg-no-repeat h-[686px] rounded-md shrink-0 w-[1012px]"
            data-name="image"
            style={{ backgroundImage: `url('${imgImage}')` }}
          />
          <div
            className="bg-center bg-cover bg-no-repeat h-[686px] rounded-md shrink-0 w-[1012px]"
            data-name="image"
            style={{ backgroundImage: `url('${imgImage1}')` }}
          />
          <div
            className="bg-center bg-contain bg-no-repeat h-[759px] shrink-0 w-[1012px]"
            data-name="image"
            style={{ backgroundImage: `url('${imgImage2}')` }}
          />
          <div
            className="bg-center bg-contain bg-no-repeat h-[759px] shrink-0 w-[1012px]"
            data-name="image"
            style={{ backgroundImage: `url('${imgImage3}')` }}
          />
        </div>
      </div>
    </div>
  );
}