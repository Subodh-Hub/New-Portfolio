import { services } from "@/assets/data/data";

export function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="services-heading">
        <span>02 / SERVICES</span>
        <div className="services-heading-copy">
          <h2>How I can help.</h2>
          <p>
            From the first component to the final API, I build digital products
            that feel considered and perform reliably.
          </p>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="service-number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
