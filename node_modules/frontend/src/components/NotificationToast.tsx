import { useNotifications } from "../context/NotificationContext";

function NotificationToast() {
  const { notifications, setNotifications } = useNotifications();

  const latest = notifications[0];

  if (!latest) {
    return null;
  }

  const closeNotification = () => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== latest.id),
    );
  };

  return (
    <div
      className="
        fixed
        top-20
        right-5
        z-50
        w-80
        rounded-lg
        bg-white
        p-4
        shadow-lg
        border
      "
    >
      <button
        onClick={closeNotification}
        className="
          absolute
          right-2
          top-2
          text-gray-500
          hover:text-red-500
        "
      >
        ✕
      </button>

      <h3 className="font-bold">{latest.title}</h3>

      <p className="mt-2 text-gray-700">{latest.message}</p>
    </div>
  );
}

export default NotificationToast;
