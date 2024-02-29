import { Routes } from '@angular/router';

//Components
import { IndexComponent } from './components/pages/index/index.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ShopProductComponent } from './components/pages/shop-product/shop-product.component';
import { BlogArticleComponent } from './components/pages/blog-article/blog-article.component';
import { AboutusComponent } from './components/pages/aboutus/aboutus.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { AdminProductComponent } from './components/pages/admin-product/admin-product.component';
import { PerfumesComponent } from './components/pages/perfumes/perfumes.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { ChangePasswordComponent } from './components/partials/change-password/change-password.component';
import { UserReviewsComponent } from './components/partials/user-reviews/user-reviews.component';
import { OrdersHistoryComponent } from './components/partials/orders-history/orders-history.component';
import { OrdersDetailComponent } from './components/partials/orders-detail/orders-detail.component';
import { AnalyticsComponent } from './components/pages/analytics/analytics.component';
import { ArchComponent } from './components/pages/arch/arch.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {
        path: 'index', component: IndexComponent
    },
    {
        path: 'aboutus', component: AboutusComponent
    },
    {
        path: 'signin', component: SigninComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'shop', component: ShopComponent
    },
    {
        path: 'shop-product/:id', component: ShopProductComponent
    },
    {
        path: 'cart', component: CartComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'blog', component: BlogComponent
    },
    {
        path: 'blog-article/:id', component: BlogArticleComponent
    },
    {
        path: 'admin-product', component: AdminProductComponent
    },
    {
        path: 'perfumes', component: PerfumesComponent
    },
    {
        path: 'perfumes/:category', component: PerfumesComponent
    },
    {
        path: 'perfumes/search/:search', component: PerfumesComponent
    },
    {
        path: 'perfumes-man', component: PerfumesComponent
    },
    {
        path: 'perfumes-woman', component: PerfumesComponent
    },
    {
        path: 'perfumes-unisex', component: PerfumesComponent
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'terms-conditions', component: TermsConditionsComponent
    },
    {
        path: 'privacy', component: PrivacyComponent
    },
    {
        path: 'change-password', component: ChangePasswordComponent
    },
    {
        path: 'user-reviews', component: UserReviewsComponent
    },
    {
        path: 'orders-history', component: OrdersHistoryComponent
    },
    {
        path: 'orders-detail/:orderId', component: OrdersDetailComponent
    },
    {
        path: 'analytics', component: AnalyticsComponent
    },
    {
        path: 'arch', component: ArchComponent
    },
];
