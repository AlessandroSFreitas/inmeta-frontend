export default defineNuxtRouteMiddleware((to) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');

    const publicRoutes = ['/', '/signup', '/reset_password'];
    
    if (!token && !publicRoutes.includes(to.path)) {
      return navigateTo('/');
    }
  }
});
