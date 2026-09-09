import styles from "./Layout.module.css";

const features = [
  { icon: "🌿", title: "Crafted with Care", sub: "Every dish made fresh" },
  { icon: "🏆", title: "Vegetarian Special", sub: "100% pure veg kitchen" },
  { icon: "✨", title: "Signature Recipes", sub: "Unique Vatika flavours" },
  { icon: "🚀", title: "Pretty Quick & Tasty", sub: "Fast & flavourful" },
  { icon: "❤️", title: "Our Farm", sub: "Quality ingredients" },
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresInner}>
        {features.map((f, i) => (
          <div key={f.title} className={styles.featureItem}>
            <div className={styles.featureIcon} style={{ animationDelay: `${i * 0.4}s` }}>
              {f.icon}
            </div>
            <div className={styles.featureTitle}>{f.title}</div>
            <div className={styles.featureSub}>{f.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
``