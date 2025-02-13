"use client";

import React from "react";

import Link from "next/link";

import { hideNotification } from "@/components/notification-bar/actions";
import { Notification } from "@/components/notification-bar/Notification";
import { NotificationBarPosition, NotificationBarQuery } from "@/types";

interface Props {
  position: NotificationBarPosition;
  data?: NotificationBarQuery;
}

export const NotificationBar: React.FC<Props> = ({ data, position }) => {
  const notifications = data?.notificationBars.filter(
    (not) => not.position === position,
  );
  const [activeNotification, setActiveNotification] = React.useState(0);

  React.useEffect(() => {
    if (!notifications || notifications.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setActiveNotification((prev) =>
        prev + 1 >= notifications.length ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications]);

  if (!notifications || notifications.length === 0) {
    return null;
  }

  const content = notifications[activeNotification]?.content;
  const backgroundColor =
    notifications[activeNotification]?.content?.backgroundColor;
  const textColor = notifications[activeNotification]?.content?.textColor;

  if (!content?.content) {
    return null;
  }

  const onClose = (id: string) => {
    return hideNotification(id);
  };

  if (content?.link) {
    return (
      <Link
        href={content?.link ?? ""}
        target={content?.openLinkInNewWindow ? "_blank" : ""}
      >
        <Notification
          content={content.content.html}
          backgroundColor={backgroundColor}
          color={textColor}
          onClose={() => onClose(content.id)}
        />
      </Link>
    );
  }

  return (
    <Notification
      content={content?.content.html}
      backgroundColor={backgroundColor}
      color={textColor}
      onClose={() => onClose(content.id)}
    />
  );
};
