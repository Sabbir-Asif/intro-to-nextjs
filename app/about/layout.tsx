const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <nav className="mb-4">Mission | Vission</nav>
            {children}
        </div>
    );
};

export default layout;