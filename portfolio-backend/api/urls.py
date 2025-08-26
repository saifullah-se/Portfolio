from django.urls import path, include
from rest_framework import routers
from .views import (
    NavbarItemViewSet, HomeSectionViewSet, AboutSectionViewSet, SoftSkillViewSet,
    SkillViewSet, EducationViewSet, CertificateViewSet, ContactInfoViewSet,
    ExperienceViewSet, ProjectViewSet, GalleryImageViewSet, ContactMessageViewSet,
    FooterLinkViewSet, NavbarLogoViewSet, SiteSettingsViewSet,  
)


router = routers.DefaultRouter()
router.register(r'navbar', NavbarItemViewSet, basename='navbar')
router.register(r'home', HomeSectionViewSet, basename='home')
router.register(r'about', AboutSectionViewSet, basename='about')
router.register(r'soft-skills', SoftSkillViewSet, basename='soft-skills')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'certificates', CertificateViewSet, basename='certificates')
router.register(r'contact', ContactInfoViewSet, basename='contact')
router.register(r'experiences', ExperienceViewSet, basename='experiences')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')
router.register(r'contact-messages', ContactMessageViewSet, basename='contact-messages')
router.register(r'footer-links', FooterLinkViewSet, basename='footer-links') 
router.register(r'navbar-logo', NavbarLogoViewSet, basename='navbar-logo')    
router.register(r'site-settings', SiteSettingsViewSet, basename='site-settings')  


urlpatterns = [
    path('', include(router.urls)),
]
