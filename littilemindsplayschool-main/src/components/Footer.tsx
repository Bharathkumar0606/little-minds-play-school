import { MapPin, Phone, Mail, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-2xl font-bold mb-4">Innovative Play School</h3>
          <p className="opacity-90 leading-relaxed">
            Nurturing young minds through play-based learning, creativity, and fun! Building strong foundations for ages 3–6.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-bold mb-4">Contact Us</h4>
          <div className="space-y-3 opacity-90">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Subash Nagar, Nizamabad</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:8639133127" className="hover:underline">8639133127</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>info@innovativeplayschool.com</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
          <div className="space-y-2 opacity-90">
            <a href="/admission" className="block hover:underline">Admission & Fees</a>
            <a href="/visit" className="block hover:underline">Schedule a Visit</a>
            <a href="/brain-games" className="block hover:underline">Brain Games</a>
            <a href="/activities" className="block hover:underline">Activities</a>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center opacity-80">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={16} className="text-red" /> by Innovative Play School
        </p>
        <p className="text-sm mt-1">Founded by Gangone Sreevalli</p>
      </div>
    </div>
  </footer>
);

export default Footer;
