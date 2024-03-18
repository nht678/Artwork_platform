import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import Profile from "../../components/Profile";
import Footer from "../../components/Footer";

const ProductPage = () => {
    const { t } = useTranslation();

    return (
        <Fragment>
            <Header />
            <PageTitle
                pageTitle={t("header-navigation.product")}
                pagesub={t("header-navigation.product")}
            />
            <Profile />
            <Footer />
        </Fragment>
    );
};
export default ProductPage;
