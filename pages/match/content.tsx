import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type Depth4FrameType = {
  className?: string;
  depth6Frame0?: string;
  hannah20?: string;
  mathematics?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
  propDisplay?: CSSProperties["display"];
};

const Depth4Frame: NextPage<Depth4FrameType> = ({
  className = "",
  depth6Frame0,
  hannah20,
  mathematics,
  propMinWidth,
  propDisplay,
}) => {
  const mathematicsStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      display: propDisplay,
    };
  }, [propMinWidth, propDisplay]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start p-4 box-border max-w-full text-left text-sm text-steelblue font-plus-jakarta-sans ${className}`}
    >
      <div className="self-stretch rounded-xl flex flex-row items-start justify-start max-w-full [row-gap:20px] mq950:flex-wrap">
        <img
          className="h-64 flex-1 relative rounded-xl max-w-full overflow-hidden object-cover min-w-[218px] mq950:flex-1"
          loading="lazy"
          alt=""
          src={depth6Frame0}
        />
        <div className="flex-[0.9046] flex flex-col items-start justify-center p-4 box-border gap-1 min-w-[288px] max-w-full mq950:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch relative leading-[21px]">
              Match of the day
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-lg text-white">
            <b className="self-stretch relative leading-[23px]">{hannah20}</b>
          </div>
          <div className="self-stretch flex flex-row items-end justify-between gap-5 text-base mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start">
              <div
                className="relative leading-[24px] inline-block min-w-[99px]"
                style={mathematicsStyle}
              >
                {mathematics}
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-[5.5px] px-4 bg-mediumblue w-[100px] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border min-w-[84px] max-w-[480px] mq700:max-w-full">
              <div className="flex-1 overflow-hidden flex flex-col items-center justify-start">
                <div className="self-stretch relative text-sm leading-[21px] font-medium font-plus-jakarta-sans text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                  Start Chat
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depth4Frame;
