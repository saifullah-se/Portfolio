from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
from django.contrib.auth.models import User
import os
def create_admin_emergency(request):
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'YourTemporaryPass123')

    # Delete existing to be sure
    User.objects.filter(username=username).delete()
    
    # Create fresh
    User.objects.create_superuser(username=username, email=email, password=password)
    
    return HttpResponse(f"Admin '{username}' created/reset successfully. Try logging in now.")

from .models import (
    NavbarItem, HomeSection, AboutSection, Skill,
    Education, Certificate, ContactInfo,
    Experience, Project, SoftSkill, GalleryImage, ContactMessage,
    FooterLink, NavbarLogo, SiteSettings,   
)
from .serializers import (
    NavbarItemSerializer, HomeSectionSerializer, AboutSectionSerializer,
    SkillSerializer, EducationSerializer, CertificateSerializer, ContactInfoSerializer,
    ExperienceSerializer, ProjectSerializer, SoftSkillSerializer, GalleryImageSerializer,
    ContactMessageSerializer, FooterLinkSerializer,  
    NavbarLogoSerializer, SiteSettingsSerializer,    
)



class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
    
class NavbarLogoViewSet(viewsets.ModelViewSet):
    queryset = NavbarLogo.objects.all()
    serializer_class = NavbarLogoSerializer
    permission_classes = [ReadOnlyOrAdmin]
    parser_classes = [MultiPartParser, FormParser]  


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [ReadOnlyOrAdmin]
    parser_classes = [MultiPartParser, FormParser]

    

class NavbarItemViewSet(viewsets.ModelViewSet):
    queryset = NavbarItem.objects.all()
    serializer_class = NavbarItemSerializer
    permission_classes = [ReadOnlyOrAdmin]


class HomeSectionViewSet(viewsets.ModelViewSet):
    queryset = HomeSection.objects.all()
    serializer_class = HomeSectionSerializer
    permission_classes = [ReadOnlyOrAdmin]
    parser_classes = [MultiPartParser, FormParser]


class AboutSectionViewSet(viewsets.ModelViewSet):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer
    permission_classes = [ReadOnlyOrAdmin]
    parser_classes = [MultiPartParser, FormParser]


class SoftSkillViewSet(viewsets.ModelViewSet):
    queryset = SoftSkill.objects.all()
    serializer_class = SoftSkillSerializer
    permission_classes = [ReadOnlyOrAdmin]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [ReadOnlyOrAdmin]


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [ReadOnlyOrAdmin]


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [ReadOnlyOrAdmin]


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [ReadOnlyOrAdmin]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [ReadOnlyOrAdmin]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [ReadOnlyOrAdmin]


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [ReadOnlyOrAdmin]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can send a message

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Send email notification
        send_mail(
            subject=f"New Contact Message: {serializer.validated_data.get('subject', 'No Subject')}",
            message=f"""
You received a new message:

Name: {serializer.validated_data['name']}
Email: {serializer.validated_data['email']}
Message: {serializer.validated_data['message']}
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# 🔹 Footer Link ViewSet
class FooterLinkViewSet(viewsets.ModelViewSet):
    queryset = FooterLink.objects.all()
    serializer_class = FooterLinkSerializer
    permission_classes = [ReadOnlyOrAdmin]
