interface TooltipProps {
  children: React.ReactNode;
  description: string;
}

const Tooltip = ({ description, children }: TooltipProps) => {
  return (
    <>
      {/*      <!-- Component: Bottom base sized tooltip --> */}
      <span
        className='relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none'
        aria-describedby='tooltip-02'
      >
        {/*        <!-- Tooltip trigger --> */}
        {children}
        {/*        <!-- End Tooltip trigger --> */}
        <span
          role='tooltip'
          id='tooltip-02'
          className="invisible absolute top-full left-1/2 z-10 mt-2 w-48 -translate-x-1/2 rounded bg-slate-700 p-4 text-sm text-white opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:bottom-full before:z-10 before:mt-2 before:-ml-2 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
        >
          {description}
        </span>
      </span>
      {/*      <!-- End Bottom base sized tooltip --> */}
    </>
  );
};

export { Tooltip };
