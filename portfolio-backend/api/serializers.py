from rest_framework import serializers
from .models import (
    NavbarItem, HomeSection, AboutSection, Skill,
    Education, Certificate, ContactInfo,
    Experience, Project, SoftSkill, GalleryImage, ContactMessage,
    FooterLink, NavbarLogo, SiteSettings,   
)

class NavbarLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarLogo
        fields = "__all__"


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"



class NavbarItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarItem
        fields = '__all__'


class HomeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeSection
        fields = '__all__'


class SoftSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftSkill
        fields = '__all__'


class AboutSectionSerializer(serializers.ModelSerializer):
    soft_skills = SoftSkillSerializer(many=True, read_only=True)

    class Meta:
        model = AboutSection
        fields = ['id', 'title', 'description', 'about_image', 'soft_skills']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format="%b %Y")
    end_date = serializers.DateField(format="%b %Y", required=False, allow_null=True)

    class Meta:
        model = Education
        fields = '__all__'


class CertificateSerializer(serializers.ModelSerializer):
    issue_date = serializers.DateField(format="%b %Y") 

    class Meta:
        model = Certificate
        fields = '__all__'



class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'   # is_present included automatically


class ProjectSerializer(serializers.ModelSerializer):
    tools = serializers.SerializerMethodField()
    languages = serializers.SerializerMethodField() 

    class Meta:
        model = Project
        fields = '__all__'

    def get_tools(self, obj):
        return [t.strip() for t in obj.tools.split(",")] if obj.tools else []

    def get_languages(self, obj): 
        return [l.strip() for l in obj.languages.split(",")] if obj.languages else []



class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = '__all__'

