"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info";

type AlertOptions = {
  title?: string;
  message: string;
  type?: NotificationType;
  buttonText?: string;
};

type ConfirmOptions = {
  title?: string;
  message: string;
  type?: NotificationType;
  confirmText?: string;
  cancelText?: string;
};

type NotificationState =
| {
    mode: "alert";
    title: string;
    message: string;
    type: NotificationType;
    confirmText: string;
    cancelText: "";
    resolve: () => void;
  }  | {
      mode: "confirm";
      title: string;
      message: string;
      type: NotificationType;
      confirmText: string;
      cancelText: string;
      resolve: (value: boolean) => void;
    };

type TeezNotificationContextType = {
  teezAlert: (
    options: AlertOptions
  ) => Promise<void>;

  teezConfirm: (
    options: ConfirmOptions
  ) => Promise<boolean>;
};

const TeezNotificationContext =
  createContext<
    TeezNotificationContextType | undefined
  >(undefined);

function defaultTitle(
  type: NotificationType
) {
  switch (type) {
    case "success":
      return "SUCCESS";

    case "error":
      return "ACTION FAILED";

    case "warning":
      return "ACTION REQUIRED";

    default:
      return "TEEZ GOLF CHALLENGES";
  }
}

export function TeezNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    notification,
    setNotification,
  ] = useState<NotificationState | null>(
    null
  );

const teezAlert = useCallback(
  ({
    title,
    message,
    type = "info",
    buttonText = "OK",
  }: AlertOptions) => {
    return new Promise<void>(
      (resolve) => {
        setNotification({
          mode: "alert",
          title:
            title ||
            defaultTitle(type),
          message,
          type,
          confirmText: buttonText,
          cancelText: "",
          resolve,
        });
      }
    );
  },
  []
);

  const teezConfirm = useCallback(
    ({
      title,
      message,
      type = "warning",
      confirmText = "CONFIRM",
      cancelText = "CANCEL",
    }: ConfirmOptions) => {
      return new Promise<boolean>(
        (resolve) => {
          setNotification({
            mode: "confirm",
            title:
              title ||
              defaultTitle(type),
            message,
            type,
            confirmText,
            cancelText,
            resolve,
          });
        }
      );
    },
    []
  );

function closeAlert() {
  if (
    notification?.mode ===
    "alert"
  ) {
    notification.resolve();
  }

  setNotification(null);
}

  function confirmAction() {
    if (
      notification?.mode ===
      "confirm"
    ) {
      notification.resolve(true);
    }

    setNotification(null);
  }

  function cancelAction() {
    if (
      notification?.mode ===
      "confirm"
    ) {
      notification.resolve(false);
    }

    setNotification(null);
  }

  const borderClass =
    notification?.type === "success"
      ? "border-green-400"
      : notification?.type === "error"
      ? "border-red-500"
      : notification?.type === "warning"
      ? "border-amber-400"
      : "border-cyan-400";

  const titleClass =
    notification?.type === "success"
      ? "text-green-400"
      : notification?.type === "error"
      ? "text-red-400"
      : notification?.type === "warning"
      ? "text-amber-300"
      : "text-cyan-300";

  const buttonClass =
    notification?.type === "success"
      ? "bg-green-400 hover:bg-green-300"
      : notification?.type === "error"
      ? "bg-red-500 hover:bg-red-400"
      : notification?.type === "warning"
      ? "bg-amber-400 hover:bg-amber-300"
      : "bg-cyan-400 hover:bg-cyan-300";

  return (
    <TeezNotificationContext.Provider
      value={{
        teezAlert,
        teezConfirm,
      }}
    >
      {children}

      {notification && (
        <div className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center px-4">
          <div
            className={`
              w-full
              max-w-md
              bg-neutral-950
              border-2
              ${borderClass}
              rounded-2xl
              p-6
              shadow-2xl
              space-y-5
            `}
          >
            <div className="text-center space-y-3">
              <h2
                className={`
                  text-2xl
                  font-extrabold
                  ${titleClass}
                `}
              >
                {notification.title}
              </h2>

              <p className="text-white text-base font-semibold leading-relaxed whitespace-pre-line">
                {notification.message}
              </p>
            </div>

            {notification.mode ===
            "confirm" ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={
                    cancelAction
                  }
                  className="w-full bg-neutral-800 hover:bg-neutral-700 border border-gray-500 text-white font-extrabold py-3 rounded-xl transition"
                >
                  {
                    notification.cancelText
                  }
                </button>

                <button
                  type="button"
                  onClick={
                    confirmAction
                  }
                  className={`
                    w-full
                    ${buttonClass}
                    text-black
                    font-extrabold
                    py-3
                    rounded-xl
                    transition
                  `}
                >
                  {
                    notification.confirmText
                  }
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={closeAlert}
                className={`
                  w-full
                  ${buttonClass}
                  text-black
                  font-extrabold
                  py-3
                  rounded-xl
                  transition
                `}
              >
                {
                  notification.confirmText
                }
              </button>
            )}
          </div>
        </div>
      )}
    </TeezNotificationContext.Provider>
  );
}

export function useTeezNotification() {
  const context = useContext(
    TeezNotificationContext
  );

  if (!context) {
    throw new Error(
      "useTeezNotification must be used inside TeezNotificationProvider"
    );
  }

  return context;
}