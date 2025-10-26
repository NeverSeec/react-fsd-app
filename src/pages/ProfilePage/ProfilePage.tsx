import { useState, useEffect } from "react";
import axios from "axios";
import cn from "./ProfilePage.module.css";
import { useAuth } from "features/authRouting";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarPath?: string;
  about?: string;
  phone?: string;
  roles: string[];
  likes: string[];
  favoritesPost: string[];
}

export function ProfilePage() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get<User>("https://api.v2.react-learning.ru/users/me")
      .then(({ data }) => {
        setProfile(data);
      });
  }, []);

  return (
    <div className={cn.container}>
      <div className={cn.header}>
        <h1>Профиль пользователя</h1>
      </div>
      {!profile && <button onClick={logout}>Авторизация слетела: Выйти</button>}

      {profile && (
        <div className={cn.profileCard}>
          <h2 className={cn.userName}>{profile.name}</h2>
          <div>
            Роли:{" "}
            {profile.roles.map((role, index) => (
              <span key={index}>{role}</span>
            ))}
          </div>

          <div className={cn.infoSection}>
            <div className={cn.infoGrid}>
              <div className={cn.infoItem}>ID: {profile.id}</div>

              <div className={cn.infoItem}>Email: {profile.email}</div>

              {profile.phone && (
                <div className={cn.infoItem}>Телефон: {profile.phone}</div>
              )}

              {profile.about && (
                <div className={cn.infoItem}>О себе: {profile.about}</div>
              )}

              <div className={cn.infoItem}>
                Лайков:
                {profile.likes.length}
              </div>

              <div className={cn.infoItem}>
                Избранных постов: {profile.favoritesPost.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
