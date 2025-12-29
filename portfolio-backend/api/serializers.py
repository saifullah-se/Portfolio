from rest_framework import serializers
from .models import (
    NavbarItem, HomeSection, AboutSection, Skill,
    Education, Certificate, ContactInfo,
    Experience, Project, SoftSkill, GalleryImage, ContactMessage,
    FooterLink, NavbarLogo, SiteSettings,   
)

def get_secure_image_url(image_field):
    """Ensures the Cloudinary URL is secure and has an extension for mobile."""
    if image_field:
        url = image_field.url
        # If the URL doesn't end with a common extension, force .jpg
        if not any(url.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
            return f"{url}.jpg"
        return url
    return None

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
    # Using the name 'profile_image' to match your model or a custom name
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = HomeSection
        fields = '__all__'

    def get_profile_image(self, obj):
        return get_secure_image_url(obj.profile_image)


class SoftSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftSkill
        fields = '__all__'


class AboutSectionSerializer(serializers.ModelSerializer):
    soft_skills = SoftSkillSerializer(many=True, read_only=True)
    about_image = serializers.SerializerMethodField()

    class Meta:
        model = AboutSection
        fields = ['id', 'title', 'description', 'about_image', 'soft_skills']

    def get_about_image(self, obj):
        return get_secure_image_url(obj.about_image)


class SkillSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = '__all__'

    def get_image(self, obj):
        return get_secure_image_url(obj.image)

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
    project_image = serializers.SerializerMethodField()
    def get_project_image(self, obj):
        return get_secure_image_url(obj.image) # Use your helper

    class Meta:
        model = Project
        fields = '__all__'

    def get_tools(self, obj):
        return [t.strip() for t in obj.tools.split(",")] if obj.tools else []

    def get_languages(self, obj): 
        return [l.strip() for l in obj.languages.split(",")] if obj.languages else []



class GalleryImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = '__all__'

    def get_image(self, obj):
        return get_secure_image_url(obj.image)

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = '__all__'

