import resend
import os  # <--- Make sure this is imported
from rest_framework import viewsets, permissions, status
from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings


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
resend.api_key = os.environ.get("RESEND_API_KEY")
class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Everything below MUST be indented inside the function
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # Send Email via Resend API
            try:
                resend.Emails.send({
                    "from": "onboarding@resend.dev", 
                    "to": "saifullahbhatti.se@gmail.com", 
                    "subject": f"New Message: {serializer.validated_data.get('subject')}",
                    "html": f"""
                        <h3>New Contact Message</h3>
                        <p><strong>Name:</strong> {serializer.validated_data.get('name')}</p>
                        <p><strong>Email:</strong> {serializer.validated_data.get('email')}</p>
                        <p><strong>Message:</strong> {serializer.validated_data.get('message')}</p>
                    """
                })
            except Exception as e:
                print(f"Resend error: {e}") 

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return 400 if data is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔹 Footer Link ViewSet
class FooterLinkViewSet(viewsets.ModelViewSet):
    queryset = FooterLink.objects.all()
    serializer_class = FooterLinkSerializer
    permission_classes = [ReadOnlyOrAdmin]
