import type { NextPage } from "next";

export type Depth2FrameType = {
  className?: string;
};

const Depth2Frame: NextPage<Depth2FrameType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch border-gainsboro border-b-[1px] border-solid box-border flex flex-row items-center justify-between pt-3 px-10 pb-[11px] top-[0] z-[99] sticky max-w-full gap-0 [row-gap:20px] text-left text-lg text-white font-plus-jakarta-sans ${className}`}
    >
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="flex flex-col items-start justify-start">
          <div className="w-4 h-4 relative overflow-hidden shrink-0">
            <img
              className="absolute top-[0px] left-[0px] w-full h-full"
              loading="lazy"
              alt=""
              src="/vector-0.svg"
            />
            <div className="absolute top-[0px] left-[0px] w-[13px] h-[13px]" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <a className="[text-decoration:none] relative leading-[23px] font-bold text-[inherit] inline-block min-w-[78px] whitespace-nowrap">
            Midnight
          </a>
        </div>
      </div>
      <div className="w-[1088px] flex flex-row items-start justify-end py-0 pl-[895px] pr-0 box-border gap-8 max-w-full mq1100:pl-[447px] mq1100:box-border mq450:pl-5 mq450:box-border mq750:gap-4 mq750:pl-[223px] mq750:box-border">
        <button className="cursor-pointer [border:none] py-[9.5px] px-4 bg-gray-100 flex-1 rounded-xl overflow-hidden flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq750:max-w-full">
          <div className="flex-1 overflow-hidden flex flex-col items-center justify-start">
            <a className="[text-decoration:none] self-stretch relative text-sm leading-[21px] font-bold font-plus-jakarta-sans text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
              Invite friends
            </a>
          </div>
        </button>
        <img
          className="h-10 w-10 relative rounded-xl overflow-hidden shrink-0 object-cover min-h-[40px]"
          loading="lazy"
          alt=""
          src="/depth-4-frame-1.svg"
        />
      </div>
    </header>
  );
};

export default Depth2Frame;
