export interface Offer {
  bodyType: string;
  image: string;
  model: string;
  modelCode: string;
  isElectric: boolean;
  hasShield: boolean;
  overrunKm: number;
  deadlineInfo: string;
  name: string;
  tags: string[];
  isMale: boolean;
  description: string;
  slug: string;
  isAvailability?: boolean;
  isAllUnavailable?: boolean;
  isDeadlineWithinLimit?: boolean;
  fastDelivery?: boolean;
  bestCondition: {
    deadline: number;
    productId: number;
    overrunKm: number;
    monthlyKm: number;
    deadlineInfo: string;
    isAvailability: boolean;
    monthlyInstallment: number;
    link: string;
    score: number;
    cetValue: {
      format: string;
      int: number;
      float: number;
      string: string;
    };
    moneyMonthlyInstallment: {
      format: string;
      int: number;
      float: number;
      string: string;
    };
    color: {
      color: string;
      typeOfPainting: string;
      colorCode: string;
      image: string;
    };
  };
  year: string;
  conditions?: Conditions[];
}

export interface Conditions {
  deadline: number;
  options: DeadlineOptions[];
}

export interface DeadlineOptions {
  monthlyKm: number;
  options: MonthlyKmOptions[];
}

export interface MonthlyKmOptions {
  type: string;
  options: ColorOptions[];
}

export interface ColorOptions {
  score: number;
  color: string;
  colorCode: string;
  icon: string;
  image: string;
  productId: number;
  monthlyInstallment: number;
  moneyMonthlyInstallment: {
    format: string;
    int: number;
    float: number;
    string: string;
  };
  link: string;
  isAvailability: boolean;
  deadLineInfo: string;
  deadline: number;
  overrunKm: number;
  accessories: Accessories[];
  monthlyKm?: number;
  colorType?: string;
}

interface Accessories {
  accessoryText: string;
  optionalText: string;
  monthlyInstallment: number;
  moneyMonthlyInstallment: {
    format: string;
    int: number;
    float: number;
    string: string;
  };
  productId: number;
}

export const offers: Offer[] = [
  {
    bodyType: 'Hatch',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TX2hbdRTHf_t0tdM2CUnWpCRZkmbN7XZzb5vczK4Vg3QThE2lD7Xz3ww3ya9J2vzrzU2iolgQh_8Y8w9TpnsaYitD2cNgKP5BmWN7mOiDTlDoiy_KHrQqOnB668s533M433MOh-85e130dyzBIwfObgb_umXH_AZCPN4Sou9l0W93rEJzmxBijtuqdbMsJ5dashwc6_Z0s9uabDVrzUkjbUzpW6hbtexOWzfKBb1Y7BoeMeAQRZ8QA6uO278VCLe7Y9VapmXWJ0qy0Cl792SnC8ZMccYoTDlGFtIzRjG7KNOmOV0q7pNTtxdn9i1mStMln8P-SPSZtZpwl6bqzUWzXS3JblX2xEDhyWx2OZsR27d2EZ4x26qWy9LK1618pZVhT5WxHwh_RWQvkXuITRK7Rnyc-OfEN0j4SC6hHEc5hXIONYx6F-oc6hrqRVJH0T9Ev8mEipjHNY5nGc8K3tfxXsG3ir9E6HuiFaLvoE6h_4qII3IISWCdwA2CIcJ7CZ8n_hKJcRKzpHpo29GW0DbROwzdytAo7i9xX8H7Ir6HGd4kcITgcYKXCS8RGSH6BtE3iT1DzCL2O_EQ6lOoNupzqBdInSP1GakNNA3tUbQPcK0THCVyB96f8P6ITycwSOAkgfMEswTvJdgg-BqhXwjdIFYgsULiN5IPkTxN8j2SF0heQt1P6lu0t9DW0BzwM2INz7P4-vEb-D_B_wfDTxM4QfwMiRdIXMK_SrRF9CIjMLKL0Dqhq0TGiTzArseIHiLaQ9mN4lxYRbuJPohuoB9j8G-GPmboH1zbcO3A9SCuq7i_xhPG8zyeV_FaeE_jfRefwHcnvhP4vsDvTPwG_2X8_7LzT2KfMjpP4hrJWZJvk_wOZQL1MNp1Jg4RGCb2Cond6JO438d7lJ3HCLSJeBxpnZINR7_NRl027NzCkfzBgwtG_kCzVlJ61ZJdyWVmjLRSkdVyxc5NG1nFrLUqZs62OlIpmnVpmbnZhTnj7vxsPptPpzOK2XD-xa42G-3c_Vskpd4syZrlCLbtJHP3zWWUcq1ZMGuW2VuWT7TlSkc2ijJnKHVpmyXTNrvS-r_U8Pc5rf8Dl1jwfqcDAAA.webp',
    model: 'Polo 1.0 Track',
    modelCode: 'R111Q4',
    isElectric: false,
    overrunKm: 0.5671,
    year: '25/26',
    isAvailability: true,
    deadlineInfo: 'até 60 dias.',
    hasShield: false,
    name: 'Polo',
    bestCondition: {
      score: 2.7264120000000003,
      deadline: 36,
      productId: 1589402,
      monthlyKm: 500,
      monthlyInstallment: 2272.01,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/Polo-1.0-Track-25-26/VOLKSWAGEN/15449/1589402',
      isAvailability: true,
      deadlineInfo: 'até 60 dias.',
      overrunKm: 0.5671,
      color: {
        color: 'Branco Cristal - Sólida',
        typeOfPainting: 'Pintura Sólida',
        colorCode: 'B4B4',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TXWhbdRjG__u1s3VrEpKsSW1ikmXLaUly0uSk9AMMunUgzK9ezApKF05y_k3Snnz05CTdULAIqyjuQhEn6i7GBCeWQZGCyqZD0MmEil7ovJDtxosJA7U4VPDjdPBevLw8z_u8PDzv-m2xu2MJnjm8vh38857-YzcR4kRLiJ4PxG67Y5Wau4QQs-yp1fWKHFtsyUrwQHdF1butsVbTbI5pWW1C3elsSy8vqdpCSS2Xu5pH9Dk80SNE36oQvVM7W4Tb3bHMlm7p9YwhS52Kd3TcyGt5XU5OGVNG2ShNLxjGeG5yXJYnpnRnPlXK5SdKWkn3OeyPRY9umiJWrtSKuQm7Ob1SM2QxP5EtyhN2saxbC2atUrXzos_K5XLL4znRu3Oc8By0rVqlIq1i3SpWWzlGH-LgHULfEH6YyK9EZ4heJ3Oc2OfEbhD3Eb9BYhHlJMpbKBskQyQfJDlL8l2Sn5CaR71CppdMDPEErhE8S3iW8Z7Bew3fC_gNhn8kUiVyDvU3hAOrEnifYB_BIUL3E9ok9iLxEeIzpFZIXSIN6UXS26gdBvoZGMX9Je5reF_G9zSDdwjMETxN8DNCxwnfR-QMkTeJPkd0meg2sTDJZ0naJE-R3CS1QeoKqZuk06QfIb2B60OCccKTeL_G-zPen_CpBPYSeIPAJsE8wUcJNgi-zvAthv8mWiK-TPx3EmdJXCDxEYmrpL4nfYr0BdJbpH9BfR6xjmcV3x78Gv5P8f_B4CUCp4mdJ_4S8av4V4k0iHzBkGBojeGvGN4iPEL4ScJvEzlKZAXlAIpjb5L0v6j3omqoa-z9i4HLDPyDaxeuflzzuLZwf4snhOcVPK_hbeI9i_c9fA_gO4fP0XLqO_xb-P9j3y2il9l_jPh1EkdIvEPiB5QMSceN22SOEhgk-irx_ahjuC_inWffGoG2E7OLstGtWc1GXTbswtxTxZmZOa14uGkaipM3u1rITWtZpSp3olbIZaeyim62qnphQTfbUinrdWnphUNzs9qR4qG74cxOO5CG8z52rdloFx7fISptW0qr1qjojYopC1ml3jSkaclure2ACo_N5pSK2SzppqWvLMmTbbnckY2yLGhKXdq6odt6V1p3oZq_xxH7H-WVRrnGAwAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 2.272,01',
        int: 2272.01,
        float: 2272.01,
        string: '2.272,01',
      },
      cetValue: {
        format: 'R$ 81.792,36',
        int: 81792.36000000002,
        float: 81792.36000000002,
        string: '81.792,36',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: false,
    tags: ['hatch'],
    isMale: true,
    description: 'Hatch compacto com design moderno e tecnologia avançada.',
    slug: 'polo',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TX2hbdRTHf_20s9U1CTdZE5fEJLua23Jzb5rclHYFg24VlKmj4OxwsoWb3NskXf71Nn8UX4qo4JDpZG5juAfxwQ6KULEg0kEV5mRCRUGdoNgXHybsQctABdFbn845X873nMOX8129I_Z0HMHzh1d3Qn_eM3RsGyFeaAnR_47Y0-44xWafEGKW-6p1s2yPL7TscijW7elmtzXeth1z3MgYk_puphvz83qp1DV8YtCliH4hBpfdMLVbCK-349RapmPW05Zd7JSlsezkRGZ-opgrlqyJzFRuOmOUirnpqYNmLlcsTlnTE6aLWmbG77I3Rb9ZqwmvNVlvzptLVcvuVu2eGLTms8biRFYM7F4hfA-1nWq5bDuFulOotLKMPUr6YyJfE32c9EfEZ4jfIn2KxOcktpH9yL-QXEA5i3IZZQ01gvoI6izqCuoGqVPom6T7SCcQz-AZxXca3yLSeaSb-F8mYBH-kViF2HtoNvrvCBVhE7xKaJBQmMgAkXUSZ5BHkWdI9UhtoA2gLaDdRe8wPMTwGN4v8N5EOoP_BCM7BI8TOkvoOpFTRPcTu0jsEvFXiDvEd0hEUV9CbaO-irpO6hKpNVKfkdpG09CeRFvD4x4gEzpBdArpK6RfkX7GrxPcS_ACwXVCOUJPEWoQOk_4NuG_iReJ_4S8iPwHyedIXiG5QvITkjdIfY92EW0F7Tu03xCr-Jbx-wlkCWwSuMvIBsE3SbyP_DryDQLLxBrErnN_H_s_JXyV8BbRUaLP8sBRYkeI9VAeRHGlVtEF-r3oBvoFxFvs_Yvhawz_g6cPzxCek3i28H6DL4LvDXxvIzWRriB9gF_gfxj_OfxfEnCXfktgi8C_7LtN_BoHjiHfIvkEyXdJ_oCSRnWVuUP6CMER4ueQD6CP4_0Q6ST7XiO4RNTnftplu9GtOs1G3W6083PHCzMzc0bhcLNmKb2q1a7ks9NGRqnY1XKlnT9o5BSz1qqY-bbTsZWSWXdtkD80N2s8VjhUyBUymaxiNlzjtKvNxlL-6C5JqTctu-a4_7vkgvmnZ7NKudYsmjXH7J22X1yyFzt2o2TnDaVut03LbJtd2_m_1Qj0u6P_A9nbjWWwAwAA.webp',
    model: 'Tera 1.0 MPI',
    modelCode: 'DF12Q4',
    isElectric: false,
    overrunKm: 0.5398,
    year: '25/26',
    isAvailability: true,
    deadlineInfo: 'Em até 60 dias em SP/ABC e em 90 dias demais regiões.',
    hasShield: false,
    name: 'Tera',
    bestCondition: {
      score: 3.1431120000000004,
      deadline: 36,
      productId: 1584717,
      monthlyKm: 500,
      monthlyInstallment: 2619.26,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/Tera-1.0-MPI-25-26/VOLKSWAGEN/15658/1584717',
      isAvailability: true,
      deadlineInfo: 'Em até 60 dias em SP/ABC e em 90 dias demais regiões.',
      overrunKm: 0.5398,
      color: {
        color: 'Preto Ninja - Sólida',
        typeOfPainting: 'Pintura Sólida',
        colorCode: 'A1A1',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TX2hbdRzFf_20s9U1CUnWxCUxyaK5LUlumtzatAGDbBWUqaPg7HSyhpvklz9d_vXmJp34UkQFh0wnYxuyPYgPdlAGFQuiHVRhTiZUFNQJin3xYcIetAxUEL3d2_fhnO85HM5ZvSP2dA3BS4dWd7x_3Td0dBshTrWF6P9M7DG7RqHVJ4SY5YFaQ6_I8YW2rHiDvSVV77XHTWno41pKy6i7l6qVy2qx2NMcYtCiiH4hBpeFGJjefSDs9q5Rb-uG3kiWZKFbcY5NT2XK5YzMZtOFqYycLmjT-qRMT6YmUnJKm0yXdDlVzBayRZfF3hT9er0uwsVKLZ_OmK3sUq0k8xOZVF6eMvNF3SjXa5WqOSEGS-W0tvhoWgzs-hKOR0yjVqlII98w8tV2mrEXSH6M_xsCT5L8iNAMoVsk5wl_QXibiIvIr0QXUM6gvIeyRsxP7HFis8RWiG0Qn0fdJNlHMox4DtsojpM4FnGew3kT16u4S_h-Ilgl-D4JifoHIoaQeK7gHcTrwz-Af53waSKjRGaILxHfIDFAYoHEXdQuw0MMj2H_EvtNnKdxHWdkB88xvGfwXsc_T2A_wQsELxJ6jZBBaIdwgNgrxExirxNbJ36R-Brxz4lvk0iQeJrEGjbLQATvcQJTOL_G-RvOX3CpePbiOY9nHe8E3mfwNvGew3cb3z-ECoR-JrJI5E-iLxK9THSF6CdEbxD_gcQFEiskvifxO2IVxzIuF-407k3cdxnZwPM24Q-IvEnkBu5lgk2C13mwj_2f4ruCb4vAKIHneegIwcMEl1AeRrGijqEK1PtRNdTziHfY-zfD1xj-F1sftiFsJ7BtYf8Whx_HWzjexdnCeRnnh7gErsdwncX1FW5L9DvcW7j_Y99tQtc4cJTILaJPEb1E9EeUJDErmTskD-MZIXSWyAHUcexXcZ5g3xt4OgQcVveuymavZrSaDdk0c3PH8jMzc1r-UKteUqwSmtVcOqullKrc7V8unZpOKXq9XdVzZb3ekUpRb1jTyB2cm9WeyB-819hU1oI0rTmZtVazkzuyS1Q6ppRGrVnRm5W6zKWURqsk64bs1ToWKPfsbFqp1FsFvW7oSyflyx252JXNosxpSkOaekk39Z407kE1d78l9j_-wiyd1gMAAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 2.619,26',
        int: 2619.26,
        float: 2619.26,
        string: '2.619,26',
      },
      cetValue: {
        format: 'R$ 94.293,36',
        int: 94293.36000000002,
        float: 94293.36000000002,
        string: '94.293,36',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: false,
    tags: ['suvw'],
    isMale: true,
    description: 'Chegou o Volkswagen Tera. O novo ícone para sua nova era.',
    slug: 'tera',
  },
  {
    bodyType: 'Hatch',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TX2hbdRTHf_t0tdM2CUnWpCRZkmbN7XZzb5vczK4Vg3QThE2lD7Xz3ww3ya9J2vzrzU2iolgQh_8Y8w9TpnsaYitD2cNgKP5BmWN7mOiDTlDoiy_KHrQqOnB668s533M433MOh-85e130dyzBIwfObgb_umXH_AZCPN4Sou9l0W93rEJzmxBijtuqdbMsJ5dashwc6_Z0s9uabDVrzUkjbUzpW6hbtexOWzfKBb1Y7BoeMeAQRZ8QA6uO278VCLe7Y9VapmXWJ0qy0Cl792SnC8ZMccYoTDlGFtIzRjG7KNOmOV0q7pNTtxdn9i1mStMln8P-SPSZtZpwl6bqzUWzXS3JblX2xEDhyWx2OZsR27d2EZ4x26qWy9LK1618pZVhT5WxHwh_RWQvkXuITRK7Rnyc-OfEN0j4SC6hHEc5hXIONYx6F-oc6hrqRVJH0T9Ev8mEipjHNY5nGc8K3tfxXsG3ir9E6HuiFaLvoE6h_4qII3IISWCdwA2CIcJ7CZ8n_hKJcRKzpHpo29GW0DbROwzdytAo7i9xX8H7Ir6HGd4kcITgcYKXCS8RGSH6BtE3iT1DzCL2O_EQ6lOoNupzqBdInSP1GakNNA3tUbQPcK0THCVyB96f8P6ITycwSOAkgfMEswTvJdgg-BqhXwjdIFYgsULiN5IPkTxN8j2SF0heQt1P6lu0t9DW0BzwM2INz7P4-vEb-D_B_wfDTxM4QfwMiRdIXMK_SrRF9CIjMLKL0Dqhq0TGiTzArseIHiLaQ9mN4lxYRbuJPohuoB9j8G-GPmboH1zbcO3A9SCuq7i_xhPG8zyeV_FaeE_jfRefwHcnvhP4vsDvTPwG_2X8_7LzT2KfMjpP4hrJWZJvk_wOZQL1MNp1Jg4RGCb2Cond6JO438d7lJ3HCLSJeBxpnZINR7_NRl027NzCkfzBgwtG_kCzVlJ61ZJdyWVmjLRSkdVyxc5NG1nFrLUqZs62OlIpmnVpmbnZhTnj7vxsPptPpzOK2XD-xa42G-3c_Vskpd4syZrlCLbtJHP3zWWUcq1ZMGuW2VuWT7TlSkc2ijJnKHVpmyXTNrvS-r_U8Pc5rf8Dl1jwfqcDAAA.webp',
    model: 'Polo 1.0 170 TSI Highline Auto',
    modelCode: 'BZ33K3',
    isElectric: false,
    overrunKm: 0.6863,
    year: '25/26',
    isAvailability: true,
    deadlineInfo:
      '7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
    hasShield: false,
    name: 'Polo',
    bestCondition: {
      score: 0.4333224,
      deadline: 36,
      productId: 1589358,
      monthlyKm: 500,
      monthlyInstallment: 3095.16,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/Polo-1.0-170-TSI-Highline-Auto-25-26/VOLKSWAGEN/15448/1589358',
      isAvailability: true,
      deadlineInfo:
        '7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
      overrunKm: 0.6863,
      color: {
        color: 'Branco Cristal - Sólida',
        typeOfPainting: 'Pintura Sólida',
        colorCode: 'B4B4',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TW2hbdRzH__u0tdM2DUnWpCRZkmbN6XZyTpucuF7EoN0EYV7oQ-28zXCS_HNpc-vJSTpFsSAOLzDmBRV1TyK2MiYTBkPxgjLH9jDRB52g0BdflD1oVXTg9HRvP358v7_vjx-f36mroq9jCR45cGor8PdNOxc2EeJoS4ieD0Wf3bHyzR1CiHluqdbNspxcaslyYKy7qpvd1mSrWWtOGiljSt-uulXL7rR1o5zXC4Wu4Rb9jlH0CNG_JkTvzPYYMTTUsWot0zLrE0WZ75Q9e2f3G_lMsTRlzqQyt0qZKqVThtMqlWamZ2VRFgqFvGHun5n2Ou6PRY9Zq4lYoVzNpafs5uxqtShzmalUTh61cwXTKtWq5YqdEf35JzKZ5Uxa9G5vJ9xjtlUtl6WVq1u5SivN3jsZ-5HQ14T3Eb6b6CTRK8TGiX1BbJO4l8QSynGUN1HOoIZQ70CdR11HPU_yCPpH6NeZUBELuMZxL-NewfMqnkt41_AVCf5ApELkXdQp9N8QMUQWIfFv4L9GIEhoH6GzxF4kPk58juQqWi_aEtoWeofBmxkcZegrhi7heQHvwwxv4T9M4DiBi4SWCI8QeZ3IG0SfJmoR_YNYEPVJVBv1WdRzJM-Q_JzkJpqG9ijaB7g2CIwSvg3Pz3h-wqvjH8D_Gv6zBDIE7iXQIPAKwV8JXiOaJ75C_HcSD5E4SeJ9EudIXECdJvkd2lto62hO8QtiHfczePvwGfg-xfcnw0_hP0HsHeLPE7-Ab41Ii8h5RmBkN8ENgpcJjxN-gN2PETlEZBVlD4pzYRXtOvoAuoF-jIF_GPyEwX9x7cC1E9eDuC4z9A3uEO7ncL-Mx8JzEs97eAXe2_GewPslPifxW3wX8f3Hrr-IfsboAvErJOZIvE3ie5QJ1HvQrjJxCP8w0ZeI70GfZOg0niPsOoa_TdjtwHZaNhyim426bNjZxcO5gwcXjdyBZq2oONTZlWx61kgpFbkNXDadmkkpZq1VMbMls9aWSsGsS8vMzi3OG3fl5m4gmpp1JA3ni-xqs9HO3r9tVNq2lFa1UTYb5ZrMppR6syhrluxW244oe998WinXmnmzZpmry_LxtlzpyEZBZg2lLm2zaNpmV1o3pIavxwn7HxjoVZ_NAwAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 3.095,16',
        int: 3095.16,
        float: 3095.16,
        string: '3.095,16',
      },
      cetValue: {
        format: 'R$ 111.425,76',
        int: 111425.76,
        float: 111425.76,
        string: '111.425,76',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: true,
    tags: ['hatch'],
    isMale: true,
    description: 'Hatch compacto com design moderno e tecnologia avançada.',
    slug: 'polo',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TXWhbdRjG__t1tcU2CUnWnJnEJDszp-MkJ21O2qQFg3Td1XRScHZYmfGkOflo89XTk8QhQm8muovpZM4x3JUMNylChcEExSluBYWJgrqBwkR2o-xCy0QHfpx69X7wPu_78vA863dFf8cSPLt_fUv684HBw7cR4oW2EH1vin67YxVbO4QQczxYaxgVc2ypbVakSLenGd32mG1axpg-rme17UzTy2VtcbGre8SAAxF9QgysOSG3XQi3u2PV24ZlNFIls9ipePdN5RbT44aeTU-ms3qunJkoTxdzU8WckdUnp4uZiXSxPDlhZLM-B31V9Bn1unCXso1W2VitlcxuzeyJgVI5nVnOpMXO7S-E5xHbqlUqplVoWIVqO81oiL1BQl8RPkTqA6KzRG8SGyX2GbHbyD7kn4gvoZxEOYeygRpCfQx1DvUi6jUSz6PdQvuHlIp4CtconmU8K3hP4_0c3xr-EsFbRKpELpA00X4j9R6iQeASgftIzul-QpeJnUAeRZ4h0SPxEcmdJJdI3kPrMDzI8D7c13F_gfcEvgVGtggcQTqGtEloifBDRN4icpbocaIW0S1iQdQXUW3U46hXSJwlsUHiUxJ3SCZJPk5yA9clJBlpgXAO75d47-D9EZ9GYIjAGQKXkTJITyA1kU4T_JXgfaJFoj8gryD_TvwZ4ueJrxO_QnyTxHekPiR5keS3JH9BrONZw-fDr-O_iv8eIy8ReI3YO8ivIm-SWiDSJHKN3bD7JKmjBG8QDhF-mod_JnKQSA9lL4pDtYom0IbQdLQziNcZ-ovhjxn-G9cOXIO4nsN1A_fXeEJ4XsHzBl4L73m87-IT-B7Fdwrfdfyb-L_BfwP_v-z6g-gn7DmMfJP4AeJvE_8eJYXqMHOX1EECI0RPIe9BG8P9Pt6j7HqZwCphj6O0c2azW7NazYbZtPPzRwqzs_N6YX-rXlJ6tZJdzaen9XGlatYqVTs_pWcUo96uGnnb6pjKotFwbJCfmZ_TDxRmCpnC-HhaMZqOcexaq7maf3IbpDRaJbNuOfpddZr5Q3NppVJvFY26ZfSWzWOr5krHbC6aeV1pmLZRMmyja1r_j-r-Pmf1f4PZQPqwAwAA.webp',
    model: 'Tera 1.0 TSI Comfort Auto',
    modelCode: 'DF13K3',
    isElectric: false,
    overrunKm: 0.6208,
    year: '25/26',
    isAvailability: true,
    deadlineInfo: 'Em até 90 dias após a assinatura do contrato.',
    hasShield: false,
    name: 'Tera',
    bestCondition: {
      score: 5.654502,
      deadline: 36,
      productId: 1584465,
      monthlyKm: 500,
      monthlyInstallment: 3141.39,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/Tera-1.0-TSI-Comfort-Auto-25-26/VOLKSWAGEN/15657/1584465',
      isAvailability: true,
      deadlineInfo: 'Em até 90 dias após a assinatura do contrato.',
      overrunKm: 0.6208,
      color: {
        color: 'Preto Ninja - Sólida',
        typeOfPainting: 'Pintura Sólida',
        colorCode: 'A1A1',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TXWhbdRjG__u1tcU2CUnWZCYxyTJzWpKcNDmpbQMG6bar6aTg7LQy40nyz0ebr56cpBsi9Gaiu5hOxhzirmS4SRlUGExUnOJWUKgoqBsoTGQ3yi60THTgx-nu3ovneZ-Xl9-zdkcMdA3B83vXtrx_PTB06BZCHG0L0feRGDC7RqG1Qwgxx4O1hl6RE4ttWfEGeyuq3mtPmNLQJ7SUNqVuT6pWLqvFYk9ziEHLIvqEGFwVon9me4Gw27tGva0beiNZkoVuxTn-qD6pFbLZYrk0rRVL2WktOzM1qc0UZVorTRcKmcn0ZCpdmNJdlvuq6NPrdREuVmr59JTZyq7USjKfmUrl5VEzX9SNcr1WqZoZMVgqpzNLmbTo375LOB4xjVqlIo18w8hX22nGn2WPD__XBA6S_IDQPkI3CI8R_pzwLSIuIj8TXUQ5ifI2yjoxP7HHic0Ru0DsGvEXUW-i_ksyhnga2xiOJRzLOE_j_ALXKu4SvpsEqwTPk5Cov5N8H9HAcxHPPbxW9AD-y4RPEBkjMkt8hfjHJPpJLJK4i9plZIiRcezXsX-J8wSuBUa38BzGewzvBv5FAg8RfIvgWULHCRmEtgj7iL1EzCR2nNgV4meJrxP_jPhtEgkST5BYx3YRbwTvAoFpnF_hvI3zJ1wqnmE8Z_BcxpvB-yTeJt7T-H7Dd49QgdCPRJaJ_EH0OaLniK4RvUJ0g_j3JD8kcYHEdyR-RazhWMXlwq3hvor7LqMv43md8LtEXiOyQXKBYJPgNXbBrpMkj-DbJOAn8AwP_0LwAMEVlD0o1qtjqAJ1GFVDPYN4g-G_GfmEkX-w7cA2hO0FbJvYv8Hhx_EqjjdxGjjP4XwPl8D1GK5TuK7j3sD9Le5N3P-x809Cn7L7EJEbRPcTfYfoDyhJYtZn7pA8gGeU0Ckiu1EnsF_CeYSdr-DpEHBY7F2SzV7NaDUbsmnm5g_n9-2b1_J7W_WSYkFoVnPprJZSqnKbv1w6NZNS9Hq7qufKer0jlaLesKqRm52f0_bnZ-8Tm8pakqZVJ7PWanZyT20blY4ppVFrVvRmpS5zKaXRKsm6IXu1jiXKHZxLK5V6q6DXDX1lSR7ryOWubBZlTlMa0tRLuqn3pHFfqrn7rLD_AZqIzkvWAwAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 3.141,39',
        int: 3141.39,
        float: 3141.39,
        string: '3.141,39',
      },
      cetValue: {
        format: 'R$ 113.090,04',
        int: 113090.04,
        float: 113090.04,
        string: '113.090,04',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: false,
    tags: ['suvw'],
    isMale: true,
    description: 'Chegou o Volkswagen Tera. O novo ícone para sua nova era.',
    slug: 'tera',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTXWhbdRjG__662m1tEpK0OTMJSRqbUzk55zQ5mf0Qg3QThPlBYbWTuhFPcv5Js-arJx916sVEpoIXRYUJw12JrGJRhggbKIqoQ9GJXkjHFHazG0Gmk4kKA1O9ej94fw_PxfNu_SoGu67gyQNbfyh_3bl78RpCPN0SYuBFMdjpusXmHUKIBfZW63ZFTh1vyYoy0Vs37F5rqlNym-32lJWxpo3_-5ptWBVplEo9yyeG-qAYEGLoZL_M7AzC6-26tZbt2nXTkcVuxX_PtCOnS7myMzdbLJWtGXvGyTjlsj0jLWmV77Vl0S7OycysE-jTF8WAXasJrzNdb5btdtWRvapcF0PFcm5_I5cVu3acCN9Ex61WKtIt1N3CSivL5GEmviXyHVGD6EPEbhA_SHwbs0DiMxLXSAZIHUd9BvUM6nm0CNoDaAtom2hXST-FcQVzL6aGWMQziW8V3xr-rwmcJOgwepjwFWJ1YufQTHSJ8TsigXAJbaLsQQkTCRH5kMQrJCdJzpPukP4IfRf6KvotjB4jexgZx_sl3r7sMmM3CR1B2UDZJvI80X3E3iB-irhLIoz2HNoptAukz5O-jq6jH0V_H887KOMoWZQniN6H_xv81_H_TMAgNEzoNKF3UXIoj6C8Tvg3wv8Qt4n_RHKN5E1Sy6TOktoidYHUJdJXMS-ib6L_iP4LxlHEFr4XCAwS_JTgLcbihDZIvEXyJZKXMJeJtYh9wT646wPMY4QvE40QfZzobWKHiK2jhlH3o2kYAmMYw8I4zfDfjHzMyG08u_G8jecynht4v8ds4XsZ32v4Xfxn8Z8jIAjcT2CewAkCGwQ-J7hJ8AeCXzH6J_FPGF8kuU1qntSbqCbaw5iHCI0Rf5Xk3Xjfw3-MYJrRZwm1ifr6oTojG72q22zUZaOTXzpSOHhwySocaNYcdb3qdFby2Tkro67IamWlk5-1cqpda63Y-Y7blWrJrkvXzs8vLVgPFuYLuUImk1XtRv9TOtVmo51_bAdS601H1tx-VNv9Zf7RhaxaqTWLds2111flibZc68pGSeYttS47tmN37J50_zu1ggN96X8BYq1DSKEDAAA.webp',
    model: 'T-Cross 1.4 250 TSI Highline Auto',
    modelCode: 'BF34N3',
    isElectric: false,
    overrunKm: 0.5,
    year: '25/25',
    isAvailability: true,
    deadlineInfo: 'Em até 30 dias após a assinatura do contrato.',
    hasShield: false,
    name: 'T-Cross',
    bestCondition: {
      score: 1.9674,
      deadline: 36,
      productId: 1588425,
      monthlyKm: 500,
      monthlyInstallment: 3279,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/T-Cross-1.4-250-TSI-Highline-Auto-25-25/VOLKSWAGEN/14839/1588425',
      isAvailability: true,
      deadlineInfo: 'Em até 30 dias após a assinatura do contrato.',
      overrunKm: 0.5,
      color: {
        color: 'Azul Norway - Metálica',
        typeOfPainting: 'Pintura Metálica',
        colorCode: '5T5T',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTXWhbdRjG__7a2m1tEpK0OTMJSRqbUznJSZOTLmnFIF0FYX5QWO2kbsST5N8068lHT07TTb2YyFDwoqgwQdyVyCqWyRBhA0URdSg60QvpmMJudiPIdDJRYWA636v34nme9734Pdu_iYF1W_DMwe0_lb_v3bNwHSFOtIXo2xYDzrpdbt0jhJhnX71h1uTk8basKePdDd3stiedit3qdCaNjJHX_98tUzdqUq9UuoZHDPaMok-IwVNC9E_vxgi3e9222qZtNtJVWV6veR-oZCp5M5ctHDAKhULFrBrlqWx1ujpdLpQL-QPT-WWZMXsz5eu5L4k-07JErFKrl7J5pzWzUa_KUi6fKckTTqli2stWvbbi5MRgeTk31cxlRf_ub8Iz7tj1Wk3apYZdWmlnmTjM-HeEviesE36UyE2ic0R3SJeIfU7sOnEfieOoz6G-hXoBLYT2MNo82hbaNZLPol8lvY-0hljANYFnFc8a3m_wncJfZeQwwatEGkTOoaVJSfQ_EDGETWALZS9KkFCA0EfEXiU-QXyWpEPyY1L9pFZJ3UbvMryX4THcX-HuxS4xeovAEZRNlB1CLxLeT-RNoqeJ2sSCaC-gnUa7SPICyRukUqSOkvoA13soYyhZlKcJP4j3W7w38P6CTycwROAMgfdRciiPo7xB8HeC_xI1if5MfI34LRJLJM6S2CZxkcRlktdIXyK1ReonUr-iH0Vs43kJ3wD-z_DfZjRKYJPYO8RfJn6Z9BKRNpEv2Q_3fUj6GMErhEOEnyJ8h8ghIhuoQdQpNA1doA-hG-hnGPqH4U8YvoNrD653cV3BdRP3D6TbeF7B8zpeG-9ZvOfwCXwP4ZvFdxLfJr4v8G_h_xH_14z8RfRTxhaI75CYJfE2ahrtMdKHCIwSfY34_bjP4z2GP8nI8wQ6hD09zM7LZrdut5oN2XSKi0dKc3OLRulgy6qqPd6clWJ2xsioK3IXtWI2M51RTau9YhaXTasj1YrZkLZZnF2cNx4pzd6FMzPTkzR7_XHqrWan-OSuUe04Utr1Zs1s1ixZzKiNVlVatuzWOz1R8Yn5rFqzWmXTss2NVXmyI9fWZbMii4bakI5ZNR2zK-27UsPf1zv2H4CVD9HHAwAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 3.279,00',
        int: 3279,
        float: 3279,
        string: '3.279,00',
      },
      cetValue: {
        format: 'R$ 118.044,00',
        int: 118044,
        float: 118044,
        string: '118.044,00',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: false,
    tags: ['suvw'],
    isMale: true,
    description:
      'O SUV mais vendido do país tem design moderno, tecnologia de ponta e segurança ampliada.',
    slug: 't-cross',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TW2hbdRzH__t0XYttEpKsOS4JSZaaUzk5J21O2m4Rg3QThOmk4NZBdcTTnH8ubW49zcUr9GXgBbxMnTq2JxE3KcqE4QRlU3RFhYk-zA0U5sNelD1omehgaurT78Lv8-PHj-937YbobzuCR_esbSh_bRs8cA0hnmgK0feG6G-1nYXGFiHELHdUalZJji82ZUmJdLqG1WmOt6RjjZsT5rSxmRlmsWgUCh3TIwZ6iOgTYmC1F3ZtFsLtbjvVpuVYtZQtF9ol791W2swUTJktZm07OzW5e0pm5C45VZicsKeKZnbSni5kZDpb8PXoC6LPqlaF256uNYrWSsWWnYrsigG7mJ5cyqTF1s0rhOeullMplaSTrzn5cjNN6mNG24S-I7yf1EdE9xK9QmyM2BfErhH3Ef-FxCLqS6jHUc-ghdDuQ5tFO4V2nuTjGFcx_iGlIR7BNYZnCc8y3tfxfolvFb9N8CqRMpF30SXG76TeR9QInCZwCyVIaBuhs8ReJD5GfIZkl-Sn6FvRF9FvYrQZHmR4J-6LuL_B-wK-eUY2CBxCeQplndAi4R1E3iTyFtEjRB2iG8SCaM-gtdCOoJ0j-TbJMyQ_J3kdXUd_DP1DXKdR4ijzhO_B-y3e63h_xmcQGCJwjMBZlAzKQyh1lNcI_kbwFtEFoj8RXyb-B4l5EidJrJE4R2Kd5GVSn6CfQr-M_itiDc8qvn78Jv4L-G8y8iyBl4m9Q_x54uuk5onUiXzFnbDjAVKHCV4iHCJ8kPBtIvuIdFFHUXuv1jAExhCGiXEM8QpDfzP8GcO3cW3BNYirhOsS7u_xhPA8h-coXgfvSbzv4RP47sV3FN9F_Ov4f8D_Nf5_2f4n0fPsPED8ComDJE6Q-BE1hfYg-g1S-wiMEH2V-CjGOO4P8B5m-9MEVgh7eko7LuuditOo12S9lZs7lN-7d87M72lUbbVbsVvlXDprTqhlWSmVW7ndZka1qs2ylWs5bakWrFrPBrmZuVnz_vxMPpOfmEirVr1nnFalUV_JPbwJqbWGLatOT78rvWZu_2xaLVUbC1bVsbpL8skVudyW9YLMmWpNtizbalkd6fw_avr7eqv_A9CnkpawAwAA.webp',
    model: 'Tera 1.0 TSI High Auto',
    modelCode: 'DF14K3',
    isElectric: false,
    overrunKm: 0.6598,
    year: '25/26',
    isAvailability: true,
    deadlineInfo:
      '7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
    hasShield: false,
    name: 'Tera',
    bestCondition: {
      score: 0.45962279999999994,
      deadline: 36,
      productId: 1588329,
      monthlyKm: 500,
      monthlyInstallment: 3283.02,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/Tera-1.0-TSI-High-Auto-25-26/VOLKSWAGEN/15660/1588329',
      isAvailability: true,
      deadlineInfo:
        '7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
      overrunKm: 0.6598,
      color: {
        color: 'Preto Ninja - Sólida',
        typeOfPainting: 'Pintura Sólida',
        colorCode: 'A1A1',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TXWhbdRjG__u1XYttEpKsiUtCkqXmdJyckyYntrZikK6CMJ0U3DqpjniS_PPR5qsnJ-n8gt4M_AA_pswP3JWIm5TJhMFEZVN0RYWJXswNFObFbpRdaJnoYGq6u_fieZ735eX3rF8XAx1L8Pie9U3_39uH9l9FiMMtIfo-FQN2x8o3twkh5rmjWjfLcmKpJcv-cHdVN7utCVta5oSRMqb0rUk3SiW9UOgaLjHYs4g-IQbXhOif3goQTmfHqrVMy6wnizLfKbt3TxbS6eJkQRYzmfxMuijNe9Kl6cl8aSplmpniTMaYNEqpacPw9NznRZ9Zq4looVzNpafs5sxqtShzmalUTh62cwXTKtWq5YqdEYPFUvru5Uxa9G_dJVx32Va1XJZWrm7lKq00ux9jrEPwe0L7SH5MZI7IZaLjRL8kepWYh9ivxJdQXkZ5B-U0ahD1ftR51BOo50g8iX4F_V-SKuJRHOO4lnGt4H4D91d41vAWCVwhXCH8PppE_4Pkh4g6vpP4buIPENxO8AzRl4iNE5slsUriM7R-tCW0G-gdRoYY2YXzAs5vcb-IZ5HRTXwH8T-Nf4PgEqGdhN8k_BaRI0QsIptEA6jPotqoR1DPknibxGkSX5C4hqahPYH2EY6T-GP4Fwndi_s73Ndw_4JHxzeM7xi-M_gz-B_G38D_OoHfCdwkkifyM7EVYn8SXyR-nPg68bPEN0hcIvkJ2gm0S2i_IdZxreEZwGvgPY_3BqPP4XuF6HvEXiC2QXKRcIPw19wJOx8keYjARUJBQgcI3SK8l_AqyhhK79UqukAfRjfQjyFeZfgfRj5n5BaObTiGcJRxXMT5A64grudxHcVt4T6O-wM8As99eI7iuYB3A--PeL_B-x87_iJyjl37iV0mfoD4u8R_QkmiPoR2neRefKNEXiM2hj6B8xTuQ-x4Bl-bkKvH3inZ6FatZqMuG3Z24WBubm7ByO1p1opKD0K7kk3PGCmlIrf4y6ZT0ynFrLUqZrZk1tpSKZj1XjWyswvzxgO52dvEpmZ6kkavTna12WhnH9kyKm1bSqvaKJuNck1mU0q9WZQ1S3ar7Z4ou28-rZRrzbxZs8zVZflUW650ZKMgs4ZSl7ZZNG2zK63bUsPb11v2P9LKC_3WAwAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 3.283,02',
        int: 3283.02,
        float: 3283.02,
        string: '3.283,02',
      },
      cetValue: {
        format: 'R$ 118.188,72',
        int: 118188.72,
        float: 118188.72,
        string: '118.188,72',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: true,
    tags: ['suvw'],
    isMale: true,
    description: 'Chegou o Volkswagen Tera. O novo ícone para sua nova era.',
    slug: 'tera',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTbWhbdRTG__662c41Cblpc2cakzQut_Pm3ja5yVoHBu0qCJtKwdpNncSb3H-TtHnrzUsd-qEgmyLIUGSTzX1RZB0WoR8GCg5E1MFgExVkBYWh7Isiw8lEBcVUP50XzvM8h8Nz1n8R2zuu4Jn967-pf9w5MHcdIZ5vCtF3XGxvd9xC4w4hxCx3VWp2SU4sNmVJ3d1dMe1uc6JddBut1oSVsibN__OqbVolaRaLXcsn-ntA0SdE_2ovTG0VwuvtuNWm7dq1cUcWOiX_nsnsvuyCzOzNSquQLWSmnOzeopxMW1PSSWXTTnFhISWn7Mmi0kN_JPrsalV4nclaY8FuVRzZrcgV0V9YyFiFjCW2bW0ifLvbbqVUkm6-5ubLzTR7DnOvyciXhO8j_AiRm0RniF4jNkbsU2LXiSskFtFeRDuNtoE-gv4g-iz6Gvo3JJ_D3MT8h3EdMYdnDN8SvmX8l1FWCTgMPUFok0iZyHvo4xh5zF8RMYRL8DzqDtQQIz5GLhB7lfgY8WmSbZIfY2zDWMK4jdlhcIDBUbxf4O3RPs3wLYKHUE-gXmFkkfAuIqeIHiPqEguhv4B-DP0CyQ2SNzAMjCMYG3h6cqOoKdTDhKfwX8F_A__3KCbBnQRPEnwfNYP6KOqbhH4m9BdRm-h3xJeJ3yLxFImzJNZJfEjiEslvMc5grGFsYvyEeQSxju8lFIXAJwRuM3yK4Ali7xJ_mfglAqtEmkQ-Zxfc_Q6h84SuEh4j_CT3_EjkAJEVtBBaFl3HFJg7MC3Mk-z8k8GLDP6NZwDPW3iu4rmJ9yu8P-B7Bd8b-F38Z_GfQxEoD6A8hHIU5TWUzwisEfiawGWGfid6kdE54tdIzJB4G20c_SDjBwgOE32deO-8H-B_lkCSoeMEW4R9PVOdlvVuxW3Ua7Lezs0fys_MzFv5_Y2qo61UnHY5l95npbSyrJTK7dz9Vkazq82ynWu7HakV7Zp07dz0_Kz1cH46n8mnUmnNrvc-pV1p1Fu5x7dAWq3hyKrbs2qr18w9NpvWStVGwa669sqSPNqSyx1ZL8qcpdVk23bstt2V7n-jVqCvR_0vTLXrlKEDAAA.webp',
    model: 'T-Cross 1.0 200 TSI Auto',
    modelCode: 'BF32B3',
    isElectric: false,
    overrunKm: 0.7488,
    year: '25/26',
    isAvailability: true,
    deadlineInfo:
      'Em 7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
    hasShield: false,
    name: 'T-Cross',
    bestCondition: {
      score: 0.49495180000000005,
      deadline: 36,
      productId: 1589850,
      monthlyKm: 500,
      monthlyInstallment: 3535.37,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/T-Cross-1.0-200-TSI-Auto-25-26/VOLKSWAGEN/15443/1589850',
      isAvailability: true,
      deadlineInfo:
        'Em 7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
      overrunKm: 0.7488,
      color: {
        color: 'Azul Norway - Metálica',
        typeOfPainting: 'Pintura Metálica',
        colorCode: '5T5T',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTXWhbZRjHX3_tbOeahJy0yUxjksblVE9y2uSckrVg0K6CMD8orHZ-TOJJ8jZJe_LRk5N0Qy8KMhVBhiKbqLtRxA7LoBcDBQci6mCwiQqygsJQdqPIcDJRQTGdd8_F_-Ph4fds_ip2dRzB0wc2fw_9efvgwlWEONoSom9T7HI7TrF5mxBinjtqdasiJ5dbshLa113TrW5r0i05zXZ70sgYOf3_2bZ0oyL1Uqlr-MRAzyj6hBhYF6J_eidGeL0dx25ZjlWfKMtip-K_Z8osZaySnMqYM7lcplQyTLOYzZami7JsFk2ZmTKMnDT3Tyk998eiz7JtES9VaoVszm3OrNXKsmDmMgV51C2ULGfJrlWqrikGikumUTQN0b-zm_Dtc51apSKdQt0pVFtZxg9xt87oV0TuJfIQ0evE5ohdIT5O_DPiV0koJJdRn0d9C3ULbRTtfrR5tA20b0k9i76N_i8TGmIBzzi-FXyr-C-irBMoM3yI8DbRKtH30SZIF9B_Q8QRDsEzhHYTCjPqY_Qc8VdIjJOYJeWS-oR0P-kV0jfROwwNMjSG90u8vdinGLlB8DChE4QuMbpMZC_RU8SOE3OIh9GeQzuOdo7UFqlrpNOkj5DewtOrGyOUIfQEkf34L-G_hv8HFJ3gHoInCX5IyCT0CKE3CP9C-G9iFrHvSaySuEHySZKnSW6S_IjkBVLfkX6b9AbpbdI_ox9BbOJ7AUUh8CmBm4ycIniC-HskXiJxgcA60RbRL9gLd75L-Azhy0TGiTzOXT8RPUh0DTWMOoWmoQv03egG-kn2_MXQeYb-wTOI5008l_Fcx_s13h_xvYzvdfwO_tP4P0ARKPehPIByDOVVlM8JbBD4hsBFhv8gdp6xBRJXSM6RfAd1Au1hJg4SHCH2Goneec_if4ZAiuEXCbaJ-HqYnZWNbs1pNuqy4eYXDxfm5haNwoGmXVZ7vLnVfHbGyKhVuYNaPpuZzqiW3apa-SXLbku1ZNWlY-VnF-eNBwuzt-DMzPQkjd7_uLVmo51_bMeotl0pnVqjYjUqtsxn1HqzLG1Hdmvtnij_6HxWrdjNomU71tqKPNaWqx3ZKMm8odala5Ut1-pK55bUCPT1yv4DcUyvCMcDAAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 3.535,37',
        int: 3535.37,
        float: 3535.37,
        string: '3.535,37',
      },
      cetValue: {
        format: 'R$ 127.273,32',
        int: 127273.31999999999,
        float: 127273.31999999999,
        string: '127.273,32',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: true,
    tags: ['suvw'],
    isMale: true,
    description:
      'O SUV mais vendido do país tem design moderno, tecnologia de ponta e segurança ampliada.',
    slug: 't-cross',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTXWhbdRjG__662s02CTlpc2YSkjRbTufJOWly0qUWDNpVEDaVgrWTuhFPmn_TtPnqyUnq1IuBTAeCQ4UNNnflxSqWyRBhgqKIOhlsoheyocJudiPKcDJRYWKqV-8H7-_huXjezV9Ff8cRPLtv83f1z3u3z91AiOdbQvS9IvrdjlNq3iOEmOW-at2uyPGVlqyou7vrpt1tjbuLTrPdHrcyVt78v6_ZplWR5uJi1_KJgR4o-oQYONork1uD8Ho7Tq1lO3Y9XZalTsW_J1uScmoiO5nL2NmMZcuMVcrvzU3l8_kJe2nvZDYjJ2U5N7Gk9OiPRJ9dqwlvOV9vLtntall2q3JdDJSWcrlSLiu2bTkRvt2uU61UpFOsO8XlVpY9x9l1hvA3RB4g8hjRW8RmiF0jPkb8c-I3SCgkV9BeQDuNdgE9jP4w-iz6BvrXpJ7DvI75D2kdMYdnDN8qvjX8l1GOEigz_BSh60TrRM-hpzGKmL8h4giH4AbqDtQQYT_hD4m_RmKMxDQpl9THGNswVjHuYHYY2sHQKN6v8PZkFxi5TfAg6gnUK4RXiOwkeorYMWIO8RD6S-jH0C-SukDqJoaBcQjjfTzvoo6iZlGfITKJ_wr-m_h_QjEJDhI8SfA91Bzq46hvEfqF0N_EbGI_klgjcZvkAsmzJDdJXiR5idQPGGcwNjC-x_gZ8xBiE9_LKP0EPiNwh5FTBE8Qf4fEqyQukV4g2iL6JTvh_g9IHyZ0lUiYyNNE7hLdT3QdLYQ2ga5jCsxBTAvzJIN_MfQJQ3fxbMdTwXMVzy2835Ju4TuO7038Dv6z-M-hCJSHUB5BOYLyOsoXBDYIfEfgMsN_EPuU0TkS10hOk3wbLY1-gPR-giPE3iCxC-95_IcJpBh-kWCbiK8XqtOy0a06zUZdNtzC_MHizMy8VdzXrJW19WrZXS5kp6yMtiyrlWW38KCV0-xaa9kuuE5Haot2XTp2YXp-1nq0OF3MFTOZrGY3ep_iVpuNduHJLUirN8uy5vSi2u4tC0_MZrVKrVmya469viqPtOVaRzYWZcHS6tK1y7Zrd6Xz36kV6OtJ_wvRZMMyoQMAAA.webp',
    model: 'T-Cross 1.0 200 TSI Comfortline Auto',
    modelCode: 'BF33B3',
    isElectric: false,
    overrunKm: 0.85,
    year: '25/26',
    isAvailability: true,
    deadlineInfo:
      'Em 7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
    hasShield: false,
    name: 'T-Cross',
    bestCondition: {
      score: 0.518,
      deadline: 36,
      productId: 1596795,
      monthlyKm: 1000,
      monthlyInstallment: 3700,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/T-Cross-1.0-200-TSI-Comfortline-Auto-25-26/VOLKSWAGEN/15444/1596795',
      isAvailability: true,
      deadlineInfo:
        'Em 7 dias úteis em SP/ABC, em até 15 dias interior de SP e em 30 dias demais regiões.',
      overrunKm: 0.85,
      color: {
        color: 'Branco Puro - Sólido',
        typeOfPainting: 'Pintura Sólida',
        colorCode: '0Q0Q',
        image:
          'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTXWhbdRiH_z5t7WabhiRtzkxCkmbLqZ6ck-ajqy0YtKsgzA8K1k7qRjw5-SdNe_LRk5N0Uy8GMhQEhwobOHflxSqWyRBhgqIMdTLYRC9kQ4Xd7EaU4WSiwsR03r0Xz-_3vhfPu_WbGOg4guf3bf2h_HXvjsXrCHG4JUTflhhwO06peY8QYoH7anWzKidXW7Kq7OluGGa3NelaTrPdnsxlctPG_7NtGrmqNCyrm_OKwV5Q9AkxeFSI_pntGjEy0nHslumY9XRZljpV3wPlrDWVr1hWppzZuzebL1syZ1VmKllzJlsqTc3M5vNWXpYzGX8v_YnoM21bxK1qrZiddpuzG7WyLOanM0V52C1aplOxa9UVNy8GS5V8vpTPiv7t24R3j-vUqlXpFOtOcaWVRb3A7lOEvyXyIJHHid4kNk_sKvEJ4heIXyfhJ7mK-iLqO6jn0MJoj6AtoG2ifUPqBYxrGP-S1hCLeCbwruFdx3cJ_1ECZUafIXSNaJ3oGbQ0ehHjd0Qc4RDcRNmJEiLsI_wx8ddJTJCYI-WS-hS9H30N_TZGh-GdDI8z8jUjvdplxm4RPIByHOUy4VUiu4ieJHaMmEM8hPYy2jG086TOkbqBrqMfRP8Qz_so4yhZlOeIPITvMr4b-H7GbxAcIniC4AcoeZQnUd4m9Cuhf4iZxH4isU7iFsllkqdJbpE8T_IiqR_RT6Fvov-A_gvGQcQW3lfwDxD4gsBtxk4SPE78PRKvkrhIeploi-hX7IL7PyJ9iNAVImEizxK5Q3Q_0Q3UEOoUmoYhMIYwchgnGPqb4c8YvoNnB54qnit4bjLyHekW3tfwvoXPwXca3xn8Av_D-B_FfwT_G_i_JLBJ4HsClxj9k9jnjC-SuEpyjuS7qGm0J0jvJzhG7E0Suxk5i-8QgRSjLxFsE_H2NDsrG92a02zUZcMtLB0ozs8v5Yr7mnZZ7fnmrhSys7mMuiK3VStkMzMZ1bRbK2ahYtptqVpmXTpmYW5pIfdYce6unJnZHtLo_Y9bazbahae3g2rbldKpNapmo2rLQkatN8vSdmS31u5BhacWsmrVbpZM2zE31uSRtlzvyIYlCzm1Ll2zbLpmVzp30Vygr7fsP6mtbTHHAwAA.png?mimetype=image/png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 3.700,00',
        int: 3700,
        float: 3700,
        string: '3.700,00',
      },
      cetValue: {
        format: 'R$ 133.200,00',
        int: 133200,
        float: 133200,
        string: '133.200,00',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: true,
    tags: ['suvw'],
    isMale: true,
    description:
      'O SUV mais vendido do país tem design moderno, tecnologia de ponta e segurança ampliada.',
    slug: 't-cross',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTXWhbZRjH3_5qt2mbxHPSJtrEJD0zp5LktDlp-qXLZMMLLzpXsVRQtvQkOU3S5msnJ0kHY3YgKoqs3qhM1jtZdWUwKoIX4ii4MsQpTtmECbvRK50UmehQMK3w4_l4ef8PDw_Ps_6b6GpYgpcPr__h_WvPvpk7CLFUE6LzhuiyG1am2iGEmOahYtnIm8MLNTPvVZotzWjWhu1ivmFUhhPxRFL7P9ZGRytaNtvUXWJvWyY6hdi73HZXdhLhdDasUs2wjPJQzsw08tITmeR8ZsyIm2NGbmIkOW-MjOrGZHJCn9DHddMcj2eSejYzkcjKbfWW6DRKJdGTGytX5416MWfWskLPLCRGm_VkbSnbpnXC3GVhl8UdWnqbesWqxzM7dnxRPLDTr3A9blvFfN600mUrXaglUDfZfx3fN_g1_FMEOwneYmiD0CahOyh9KJsoNwgXUF9HPYe6QcRH5Gki00Q-JvI90Tm0rxnqZUinPTHHIK5FXHWkq8jLuKdwn6Z3hkCZwAUGrhE7jraNiCJO4zmHZw3Pn3glfH58HxFaQYmiJIg2iC0Su4dm0zOA80fkl_BM4T2FdwvfQQIrBN4n-BrBJsG7hIJE6kQ_IDZC7CCxL3Gs4zyJV8d7DP-TSF8h_Yx0G9mHPEzffTzdeEbwPIXnHTyf4h3FexRvBe-79G_Tf5-ggVJGuYxyl_Ac4VcIrxA-T_gS4c8Ib6E-T-QA0Z-InSG2Ruwm4iKuV5EuI3fhvoL7Hn0ZQudR3kS5inuZQI09czwCjx6j_wv6v8U_iH-Wx44SmCLQQg2gpohE0ARaN9pZxFt0_03P5_T8i2MfjlUct3Fs43oD19s8_CuSjbSKtIb0D_IB5MPIS8iryJeQN5Cv417D_R3ua_T-QvATBmZQbrH_QcJThG-iDhJ5ltjvePoIXiC0gRJAG6JDoUOlI4zzLM4P6TiFdBz5B9xRes_Qt4Wnjr8Hf729pu-ZlWbRqlbKZsVOvWA3csVqevZFtVXM2YWUPpmIqwWzmC_YqcmxuGqUagUjZVsNU80aZdMyUodmpxPPpA-lR9LxuK4alfbZ2cVqpZ56bkeklqs5s2SZzWK9_Zg6Mp1Q86VqxihZRmvRPFk3TzTMStZMJdSyaRs5wzaaprX7NeHubJf-D7xHaEPuAwAA.webp',
    model: 'Tiguan Allspace 2.0 300 TSI R-Line Auto',
    modelCode: 'BJ25VS',
    isElectric: false,
    overrunKm: 0.987,
    year: '24/25',
    isAvailability: true,
    deadlineInfo: 'Em até 90 dias após a assinatura do contrato.',
    hasShield: false,
    name: 'Tiguan Allspace',
    bestCondition: {
      score: 13.088538,
      deadline: 36,
      productId: 1589329,
      monthlyKm: 500,
      monthlyInstallment: 7271.41,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/Tiguan-Allspace-2.0-300-TSI-R-Line-Auto-24-25/VOLKSWAGEN/15207/1589329',
      isAvailability: true,
      deadlineInfo: 'Em até 90 dias após a assinatura do contrato.',
      overrunKm: 0.987,
      color: {
        color: 'Preto Mystic - Perolizado',
        typeOfPainting: 'Pintura Perolizada',
        colorCode: '2T2T',
        image: 'https://cdn.vwfslm.com/lm/15207-2T2T.png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 7.271,41',
        int: 7271.41,
        float: 7271.41,
        string: '7.271,41',
      },
      cetValue: {
        format: 'R$ 261.770,76',
        int: 261770.76,
        float: 261770.76,
        string: '261.770,76',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: false,
    tags: ['suvw'],
    isMale: false,
    description: 'O SUV mais sofisticado, moderno e com um visual que desperta emoções.',
    slug: 'tiguan-allspace',
  },
  {
    bodyType: 'SUVW',
    image:
      'https://assets.volkswagen.com/is/image/volkswagenag/id4_lateral_rigida?Zml0PWNyb3AsMSZmbXQ9d2VicC1hbHBoYSZxbHQ9Nzkmd2lkPTY4MCZiZmM9b2ZmJjMzY2E=',
    model: 'ID.4 82kWh Pro Auto  - Seminovo',
    modelCode: 'E213MN',
    isElectric: true,
    overrunKm: 1.558,
    year: '23/23',
    isAvailability: true,
    deadlineInfo: 'até 60 dias.',
    hasShield: false,
    name: 'ID.4',
    bestCondition: {
      score: 16.496195999999998,
      deadline: 24,
      productId: 1589272,
      monthlyKm: 1500,
      monthlyInstallment: 13746.83,
      link: 'https://volkswagen.sd.fillet.dev/modelo/configuracao/ID.4-82kWh-Pro-Auto-23-23---Seminovo/VOLKSWAGEN/15747/1589272',
      isAvailability: true,
      deadlineInfo: 'até 60 dias.',
      overrunKm: 1.558,
      color: {
        color: 'Azul Dusk - Preto Ninja',
        typeOfPainting: 'Pintura Sólida',
        colorCode: '2PA1',
        image: 'https://cdn.vwfslm.com/lm/15747-2PA1.png',
      },
      moneyMonthlyInstallment: {
        format: 'R$ 13.746,83',
        int: 13746.83,
        float: 13746.83,
        string: '13.746,83',
      },
      cetValue: {
        format: 'R$ 329.923,92',
        int: 329923.92,
        float: 329923.92,
        string: '329.923,92',
      },
    },
    isDeadlineWithinLimit: true,
    fastDelivery: false,
    tags: ['suvw', 'elétricos'],
    isMale: true,
    description: 'Carro elétrico com design aerodinâmico e tecnologia sustentável.',
    slug: 'id-4',
  },
];
