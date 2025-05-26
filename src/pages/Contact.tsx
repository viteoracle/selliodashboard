import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-market-600 to-purple-600">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you with any inquiries.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-market-600 to-purple-600 px-6 py-8 text-white">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-white/80 mb-6">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>
                
                <div className="px-6 py-8 space-y-6">
                  <div className="flex items-start">
                    <div className="bg-market-50 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <a href="mailto:Sellio52@gmail.com" className="text-market-600 hover:underline">
                        Sellio52@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-market-50 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Hotline</h3>
                      <a href="tel:+2348074219598" className="text-market-600 hover:underline">
                        +234 807 421 9598
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-market-50 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        Nkwelle<br />
                        Anambra state<br />
                        Nigeria
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-market-50 p-3 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Working Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9AM - 5PM<br />
                        Saturday: 10AM - 2PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="px-6 py-6 bg-gray-50 border-t">
                  <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'facebook', url: 'https://www.facebook.com/share/14cxLG3SbH/?mibextid=wwXIfr' },
                      { name: 'whatsapp', url: 'https://chat.whatsapp.com/ICk3GlCEG3Y7XghFEb1Z3m' }
                    ].map((social) => (
                      <a 
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                      >
                        <img 
                          src={`https://cdn.simpleicons.org/${social.name}/6366F1`} 
                          alt={social.name} 
                          className="w-5 h-5" 
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea
                              className="w-full min-h-[150px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-market-600 focus:border-transparent"
                              placeholder="Your message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-market-600 hover:bg-market-700" 
                      disabled={loading}
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <span className="mr-2 animate-spin">⟳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0487026544307!2d-122.39639328468151!3d37.78774997975504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c99%3A0x3919a45d97c0dbf7!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1662049689262!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
