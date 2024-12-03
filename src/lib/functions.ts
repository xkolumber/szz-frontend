import { ActualJob } from "./interface";
import imageCompression from "browser-image-compression";

export async function fetchNavbarData() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/navbar/getnavbarinfodataopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData: any = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getActualJobs() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjobsopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    const currentMonth = new Date().getMonth() + 1;
    const final_data = responseData.Items.sort((a: ActualJob, b: ActualJob) => {
      const aOffset = (a.mesiac_cislo - currentMonth + 12) % 12;
      const bOffset = (b.mesiac_cislo - currentMonth + 12) % 12;
      return aOffset - bOffset;
    });

    return final_data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getActualThreeEvents() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/events/getactualeventsthree`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchBlogs(limit: number) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogsopen/${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchBlogIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/blogs/getblog/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchEventIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/getevent/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function getAboutUsData() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/aboutus/getaboutuspageopen/sdfg5s4fd5g-asdfasdf-5465`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getAboutUsDataToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/aboutus/getaboutuspage/sdfg5s4fd5g-asdfasdf-5465`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchBlogsToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/blogs/getblogs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchBlogBySlug(slug: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogopen/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    if (responseData != null) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchSimiliarBlogBySlug(slug: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogsexcept/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData != null) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchFaqDataClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/faq/getfaqdataopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchUnionDataToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/getuniondata`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchUnionDataIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/getunionid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchUnionDataClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/union/getuniondataopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchArchiveByYear(year: string | undefined) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/archive/getarchivebyearopen/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData != null) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchEventsToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/getallevents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchGalleriesToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/gallery/getallgalleries`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchGalleryIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/gallery/getgalleryalbum/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchActualJobsToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchActualJobIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjob/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchNavbarDataToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/navbar/getnavbarinfodata`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}
export async function fetchNavbarDataIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/navbar/getnavbarinfodataid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchFaqToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/faq/getfaqdata`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchFaqIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/faq/getfaq/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchSponsorsToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/sponsors/getsponsors`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchSponsorIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/sponsors/getsponsor/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchDocsToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/docs/getdocs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchDocIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/docs/getdoc/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchDocsClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/docs/getdocsclient`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchSponsorsClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/sponsors/getsponsorsclient`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error");
      return null;
    }

    const responseData = await response.json();

    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function CompressImage(file: File) {
  try {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    return null;
  }
}

export async function fetchGalleriesYearToken(
  token: string | null,
  year: string | undefined
) {
  if (token && year) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/gallery/getgallerysortedtoken/${year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function getContactPageToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/contact/getcontactpage/285cea37-e56b-4eb1-ba34-7b4e8cf1ea4e`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function getContactPageClient() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/contact/getcontactpageopen/285cea37-e56b-4eb1-ba34-7b4e8cf1ea4e`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error");
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchAnnouncementsToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/ann/getallann`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData.Items;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function fetchAnnouncementIdToken(
  token: string | null,
  id: string | undefined
) {
  if (token && id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/ann/getannid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function getActualityPageDataToken(token: string | null) {
  if (token) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/actualitypage/getactualitypage/1c933dae-3e21-4a7d-b6fa-6ebacccde181`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function getActualityPageData() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/actualitypage/getactualitypageopen/1c933dae-3e21-4a7d-b6fa-6ebacccde181`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error");
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
