from django.contrib import admin
from .models import ContactMessage
from django.contrib import admin
from .models import FooterLink   
from .models import NavbarLogo, SiteSettings


from .models import (
    NavbarItem, HomeSection, AboutSection, Skill,
    Education, Certificate, ContactInfo,
    Experience, Project, SoftSkill, GalleryImage
)

@admin.register(NavbarLogo)
class NavbarLogoAdmin(admin.ModelAdmin):
    list_display = ("text",)
    search_fields = ("text",)

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_title",)
    search_fields = ("site_title",)


@admin.register(NavbarItem)
class NavbarItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'link')
    ordering = ('order',)


@admin.register(HomeSection)
class HomeSectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')
    search_fields = ('name', 'title')
    fields = ('greeting', 'name', 'title', 'tagline', 'profile_image', 'resume_file')


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title', 'description')
    fields = ('title', 'description', 'about_image')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level')
    list_filter = ('category',)
    search_fields = ('name', 'category')
    ordering = ('category', '-level')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'start_date', 'end_date')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'tools', 'languages', 'link')
    search_fields = ('title', 'tools', 'languages')
    list_display_links = ('id', 'title') 


@admin.register(SoftSkill)
class SoftSkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'about')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'start_date', 'end_date')
    search_fields = ('degree', 'institution')
    list_filter = ('institution',)
    ordering = ('-start_date',)


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuing_organization', 'issue_date')
    search_fields = ('name', 'issuing_organization')
    list_filter = ('issuing_organization', 'issue_date')
    ordering = ('-issue_date',)


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone_number', 'linkedin_url', 'github_url')
    search_fields = ('email', 'phone_number')
    fieldsets = (
        ('Basic Info', {'fields': ('name', 'email', 'phone_number', 'address')}),
        ('Links', {'fields': ('linkedin_url', 'github_url')}),
    )


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'image')
    search_fields = ('title',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    ordering = ('-created_at',)


admin.site.register(FooterLink)