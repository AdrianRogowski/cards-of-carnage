import './Header.css';

interface HeaderProps {
  title: string;
  leftAction?: {
    label: string;
    onClick: () => void;
  };
  rightAction?: {
    label: string;
    onClick: () => void;
  };
  rightContent?: React.ReactNode;
}

export function Header({ title, leftAction, rightAction, rightContent }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__left">
        {leftAction && (
          <button className="header__action" onClick={leftAction.onClick}>
            {leftAction.label}
          </button>
        )}
      </div>
      <h1 className="header__title">{title}</h1>
      <div className="header__right">
        {rightAction && (
          <button className="header__action" onClick={rightAction.onClick}>
            {rightAction.label}
          </button>
        )}
        {rightContent}
      </div>
    </header>
  );
}
