'use server'

import { cookies } from 'next/headers'
import { deleteCookie, getCookie, setCookie, hasCookie, getCookies } from 'cookies-next';

export async function getPaymentInfo() {
    const theme = getCookie('test1', { cookies });

    return theme;
}