import DashboardLayout from "./DashboardLayout";
import RootLayout from "./RootLayout";

const Layout = (Component, layoutName) => {
    const WrappedComponent = (props) => {
        if (layoutName === "dashboard") {
            return <DashboardLayout pageContent={<Component {...props} />} />;
      
        } else {
            return <RootLayout pageContent={<Component {...props} />} />;
        }
    };

    WrappedComponent.displayName = `Layout(${layoutName})`;

    return WrappedComponent;
};

export default Layout;
