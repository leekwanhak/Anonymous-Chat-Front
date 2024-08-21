import type { NextPage } from "next";

export type Depth2Frame1Type = {
  className?: string;
};

const Depth2Frame1: NextPage<Depth2Frame1Type> = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-center text-base text-steelblue font-plus-jakarta-sans ${className}`}
    >
      <div className="w-[960px] flex flex-col items-start justify-start max-w-[960px] mq1100:max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start py-10 px-5 gap-6">
          <div className="self-stretch flex flex-row flex-wrap items-center justify-between gap-5">
            <div className="w-40 flex flex-col items-center justify-start min-w-[160px]">
              <div className="self-stretch relative leading-[24px]">
                Support
              </div>
            </div>
            <div className="w-40 flex flex-col items-center justify-start min-w-[160px]">
              <div className="self-stretch relative leading-[24px]">Safety</div>
            </div>
            <div className="flex flex-col items-center justify-start min-w-[160px]">
              <div className="relative leading-[24px]">
                Community Guidelines
              </div>
            </div>
            <div className="w-40 flex flex-col items-center justify-start min-w-[160px]">
              <div className="self-stretch relative leading-[24px]">Terms</div>
            </div>
            <div className="w-40 flex flex-col items-center justify-start min-w-[160px]">
              <div className="self-stretch relative leading-[24px]">
                Privacy
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-start justify-center py-0 px-5 gap-x-4 gap-y-[14.7px]">
            <div className="flex flex-col items-center justify-start">
              <div className="flex flex-col items-center justify-start">
                <div className="w-6 h-6 relative overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/face.svg"
                  />
                  <div className="absolute top-[0px] left-[0px] w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="flex flex-col items-center justify-start">
                <div className="w-6 h-6 relative overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/insta.svg"
                  />
                  <div className="absolute top-[0px] left-[0px] w-5 h-[18px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="flex flex-col items-center justify-start">
                <div className="w-6 h-6 relative overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/twit.svg"
                  />
                  <div className="absolute top-[0px] left-[0px] w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="flex flex-col items-center justify-start">
                <div className="w-6 h-6 relative overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full"
                    loading="lazy"
                    alt=""
                    src="/tele.svg"
                  />
                  <div className="absolute top-[0px] left-[0px] w-[19px] h-[21px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Depth2Frame1;
