import React, {
  useRef,
  useEffect,
  FormEvent,
  useState,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "@/hooks/use-toast";
import ScrollFloat from "@/TextAnimations/ScrollFloat/ScrollFloat";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import BlurText from "../TextAnimations/BlurText/BlurText";

gsap.registerPlugin(ScrollTrigger);

// Lazy load components
const LazyMagnet = React.lazy(() => import("@/Animations/Magnet/Magnet"));

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isAnimationsReady, setIsAnimationsReady] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon!",
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!isAnimationsReady) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const intro = introRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !heading || !intro || !form || !contactInfo) return;

    const ctx = gsap.context(() => {
      const elements = [heading, intro, form, contactInfo];
      const animations = elements.map((el, index) => ({
        element: el,
        x: index < 2 ? 0 : index === 2 ? -30 : 30,
        y: index < 2 ? (index === 0 ? 30 : 20) : 0,
        delay: index * 0.2,
      }));

      animations.forEach(({ element, x, y, delay }) => {
        gsap.fromTo(
          element,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isAnimationsReady]);

  // Set animations ready after initial render
  useEffect(() => {
    setIsAnimationsReady(true);
  }, []);

  const MemoizedFormInput = useCallback(
    ({
      id,
      label,
      type = "text",
      required = true,
      rows = 1,
    }: {
      id: keyof FormData;
      label: string;
      type?: string;
      required?: boolean;
      rows?: number;
    }) => (
      <div>
        <label
          className="block text-foreground/90 mb-2 text-sm sm:text-base font-medium text-left"
          htmlFor={id}
        >
          {label}
        </label>
        {rows > 1 ? (
          <textarea
            id={id}
            name={id}
            required={required}
            rows={rows}
            value={formData[id]}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-foreground/5 border border-foreground/10 rounded-lg text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder={`Your ${label.toLowerCase()} here...`}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            required={required}
            value={formData[id]}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-foreground/5 border border-foreground/10 rounded-lg text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder={`Your ${label.toLowerCase()}`}
          />
        )}
      </div>
    ),
    [formData, handleInputChange]
  );

  const MemoizedContactInfo = useMemo(
    () => (
      <div ref={contactInfoRef} className="space-y-4 sm:space-y-6">
        <Card className="relative border-none bg-background/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
          <SpotlightCard
            className="glass-morphism p-3 sm:p-4 md:p-6 rounded-lg flex-1"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                Contact Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 sm:mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground/50 text-xs sm:text-sm text-left">
                      Email
                    </p>
                    <a
                      href="mailto:jay32402@gmail.com"
                      className="text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      jay32402@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 sm:mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground/50 text-xs sm:text-sm text-left">
                      Phone
                    </p>
                    <a
                      href="tel:+918128641992"
                      className="text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      +91 81286 41992
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 sm:mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground/50 text-xs sm:text-sm text-left">
                      Location
                    </p>
                    <p className="text-sm sm:text-base text-foreground">
                      Bhavanipura, Petlad, Anand, 388450
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </SpotlightCard>
        </Card>

        <Card className="relative border-none bg-background/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
          <SpotlightCard
            className="glass-morphism p-3 sm:p-4 md:p-6 rounded-lg flex-1"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                Connect
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex space-x-3 sm:space-x-4">
                <Suspense
                  fallback={
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
                  }
                >
                  <LazyMagnet
                    magnetStrength={6}
                    activeTransition="transform 0.2s ease-out"
                  >
                    <a
                      href="https://github.com/jayb3008"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 hover:bg-primary/20 border border-foreground/10 flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="text-foreground"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </LazyMagnet>
                </Suspense>

                <Suspense
                  fallback={
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
                  }
                >
                  <LazyMagnet
                    magnetStrength={6}
                    activeTransition="transform 0.2s ease-out"
                  >
                    <a
                      href="https://www.linkedin.com/in/jay-sarvaiya-6728b5228/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 hover:bg-primary/20 border border-foreground/10 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="text-foreground"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                  </LazyMagnet>
                </Suspense>

                <Suspense
                  fallback={
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
                  }
                >
                  <LazyMagnet
                    magnetStrength={6}
                    activeTransition="transform 0.2s ease-out"
                  >
                    <a
                      href="https://www.instagram.com/jay.darji.30"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 hover:bg-primary/20 border border-foreground/10 flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="text-foreground"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </a>
                  </LazyMagnet>
                </Suspense>
              </div>
            </CardContent>
          </SpotlightCard>
        </Card>
      </div>
    ),
    []
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center"
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Get In Touch
          </ScrollFloat>
        </h2>

        <p
          ref={introRef}
          className="text-center text-base sm:text-lg md:text-xl text-foreground/80 mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          Have a project in mind or just want to say hello? Feel free to reach
          out and I'll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="relative border-none bg-background/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <SpotlightCard
              className="glass-morphism p-3 sm:p-4 md:p-6 rounded-lg flex-1"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6"
              >
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                    Send Message
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6">
                  <MemoizedFormInput id="name" label="Name" />

                  <MemoizedFormInput id="email" label="Email" type="email" />

                  <MemoizedFormInput id="message" label="Message" rows={5} />

                  <div className="text-center mt-8 sm:mt-12 md:mt-16">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group px-6 py-3 w-full text-center bg-transparent border font-medium rounded-full transition-all duration-300 relative overflow-hidden cursor-target"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </CardContent>
              </form>
            </SpotlightCard>
          </Card>

          {/* Contact Info */}
          {MemoizedContactInfo}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
