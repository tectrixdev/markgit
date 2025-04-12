'use client';
import type { OptionsType } from 'cookies-next';
import { useGetCookies, useSetCookie, useHasCookie, useDeleteCookie, useGetCookie } from 'cookies-next';

export default function hasCookie(key: string, options?: OptionsType) {
  const setCookie = useSetCookie();
  const hasCookie = useHasCookie();
  const deleteCookie = useDeleteCookie();
  const getCookies = useGetCookies();
  const getCookie = useGetCookie();
  hasCookie(key, options);
}