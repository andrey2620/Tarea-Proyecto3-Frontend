import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AppLayoutComponent } from "./components/app-layout/app-layout.component";
import { SigUpComponent } from "./pages/auth/sign-up/signup.component";
import { UsersComponent } from "./pages/users/users.component";
import { AuthGuard } from "./guards/auth.guard";
import { AccessDeniedComponent } from "./pages/access-denied/access-denied.component";
import { AdminRoleGuard } from "./guards/admin-role.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { GuestGuard } from "./guards/guest.guard";
import { IRoleType } from "./interfaces";
import { ProfileComponent } from "./pages/profile/profile.component";
import { GamesComponent } from "./pages/games/games.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { PreferenceListPageComponent } from "./pages/preferenceList/preference-list.component";
import { CategoryPageComponent } from "./pages/category/category.component";
import { CategoryUserComponent } from "./pages/category-user/category-user.component";
import { ProductsPageComponent } from "./pages/products/products.component";
import { ProductsUserComponent } from "./pages/products-user/products-user.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "signup",
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "access-denied",
    component: AccessDeniedComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "app",
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "app",
        redirectTo: "users",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent,
        canActivate: [AdminRoleGuard],
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin],
          name: "Users",
          showInSidebar: true,
        },
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin, IRoleType.user],
          name: "Dashboard",
          showInSidebar: true,
        },
      },
      {
        path: "profile",
        component: ProfileComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin, IRoleType.user],
          name: "profile",
          showInSidebar: false,
        },
      },
      {
        path: "games",
        component: GamesComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin, IRoleType.user],
          name: "games",
          showInSidebar: true,
        },
      },
      {
        path: "orders",
        component: OrdersComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin, IRoleType.user],
          name: "orders",
          showInSidebar: true,
        },
      },
      {
        path: "preference-list",
        component: PreferenceListPageComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin, IRoleType.user],
          name: "preference list",
          showInSidebar: true,
        },
      },
      {
        path: "products",
        component: ProductsPageComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin],
          name: "products",
          showInSidebar: true,
        },
      },
      {
        path: "category",
        component: CategoryPageComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.superAdmin],
          name: "category",
          showInSidebar: true,
        },
      },
      {
        path: "productsUser",
        component: ProductsUserComponent,
        data: {
          authorities: [IRoleType.user],
          name: "productsUser",
          showInSidebar: true,
        },
      },
      {
        path: "categoryUser",
        component: CategoryUserComponent,
        data: {
          authorities: [IRoleType.user],
          name: "categoryUser",
          showInSidebar: true,
        },
      },
    ],
  },
];
