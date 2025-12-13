// components/services/ServiceCard.jsx
export default function ServiceCard({ title, index }) {
  return (
    <div
      className="service-card"
      style={{ top: `${index * 90}px` }}
    >
      <div className="service-dot" />
      <span>{title}</span>
    </div>
  )
}
