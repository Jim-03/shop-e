import styles from "./Notification.module.css";

function Notification(props) {
  const notificationClass = `${styles.notification} ${
    styles[props.notificationType] || ""
  }`;

  return (
    <section className={notificationClass}>
      <div className={styles.notificationHeader}>
        <div className={styles.closeDiv}>
          <p>&times;</p>
        </div>
        <p className={styles.notificationType}>{props.notificationType}</p>
      </div>
      <div className={styles.notificationBody}>
        <p id="message">{props.notificationMessage}</p>
      </div>
    </section>
  );
}

export default Notification;
