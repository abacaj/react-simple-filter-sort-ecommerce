import { useState } from 'react';

export default function CollapsibleList({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="pv4 bb b--black-10">
      <button
        onClick={() => setVisible((visible) => !visible)}
        className={
          'btn b pa0 w-100 tl bg-transparent hover-light-purple' +
          (visible ? ' mb2 light-purple' : '')
        }
      >
        {title}
      </button>
      {visible ? <ul className="list pa0 ma0">{children}</ul> : null}
    </div>
  );
}
