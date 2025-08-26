from django.db import models
from ckeditor.fields import RichTextField


class NavbarItem(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class HomeSection(models.Model):
    greeting = models.CharField(max_length=100, default='Hi, my name is')
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=150)
    tagline = models.CharField(max_length=255, blank=True, default='')
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)

    def __str__(self):
        return self.name


class AboutSection(models.Model):
    title = models.CharField(max_length=100, default='About Me')
    description = RichTextField()
    about_image = models.ImageField(upload_to='about/', blank=True, null=True)

    def __str__(self):
        return self.title


class SoftSkill(models.Model):
    about = models.ForeignKey(AboutSection, related_name="soft_skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Front-End', 'Front-End'),
        ('Back-End', 'Back-End'),
        ('Design & Tools', 'Design & Tools'),
    ]
    name = models.CharField(max_length=100)
    icon_class = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='skills/', blank=True, null=True)
    level = models.IntegerField(default=0)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default='Front-End')

    def __str__(self):
        return self.name


class Experience(models.Model):
    role = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_present = models.BooleanField(default=False)
    description = RichTextField()

    def __str__(self):
        return f"{self.role} at {self.company}"



class Project(models.Model):
    title = models.CharField(max_length=200)
    description = RichTextField()
    tools = models.CharField(max_length=255, blank=True, null=True)
    languages = models.CharField(max_length=255, blank=True, null=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="gallery/")
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title or f"Image {self.id}"


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    # description = models.TextField(blank=True)
    description = RichTextField()


    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Certificate(models.Model):
    name = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.DateField()
    credential_url = models.URLField(blank=True)

    def __str__(self):
        return self.name


class ContactInfo(models.Model):
    name = models.CharField(max_length=100, blank=True, default='')
    email = models.EmailField()
    phone_number = models.CharField(max_length=50)
    address = models.CharField(max_length=255)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    def __str__(self):
        return self.email


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"


class FooterLink(models.Model):
    ICON_CHOICES = [
        ('linkedin', 'LinkedIn'),
        ('github', 'GitHub'),
        ('email', 'Email'),
        ('twitter', 'Twitter'),
        ('facebook', 'Facebook'),
        ('custom', 'Custom'),
    ]

    name = models.CharField(max_length=100)
    url = models.URLField()
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='custom')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


# --- Navbar branding (text / logo) ---
class NavbarLogo(models.Model):
    text = models.CharField(max_length=100, blank=True, default="SRA Portfolio")
    logo = models.ImageField(upload_to="logo/", blank=True, null=True)  # optional

    def __str__(self):
        return self.text or "Navbar Logo"


# --- Global site settings (tab title + favicon) ---
class SiteSettings(models.Model):
    site_title = models.CharField(max_length=100, default="Portfolio")
    favicon = models.ImageField(upload_to="favicon/", blank=True, null=True)  # optional

    def __str__(self):
        return self.site_title
