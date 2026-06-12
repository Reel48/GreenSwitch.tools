import * as React from "react";

/**
 * Component overrides for MDX article rendering. Wide markdown tables get a
 * horizontal-scroll wrapper so they can't clip off-screen on phones — the
 * wrapper is inert when the table fits (same pattern as the state pages).
 */
export const mdxComponents = {
  table: (props: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};
