const DetailLayout = ({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
          <div className="min-w-0 order-2 lg:order-1">{children}</div>
          <aside
            id="calculator"
            className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit space-y-6 scroll-mt-24"
          >
            {sidebar}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DetailLayout;
