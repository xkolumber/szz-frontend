import imageCompression from "browser-image-compression";
import { ActualEvent, ActualJob, Oznamy, Spravodajca } from "./interface";

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

export const getActualEventsYearToken = async (rok: string | undefined) => {
  if (rok) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/geteventsbyyear/${rok}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      const sortedData = responseData.Items.sort(
        (a: ActualEvent, b: ActualEvent) => {
          if (a.nazov_vystavy < b.nazov_vystavy) {
            return -1;
          }
          if (a.nazov_vystavy > b.nazov_vystavy) {
            return 1;
          }
          return 0;
        }
      );

      return sortedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  } else {
    return null;
  }
};

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
    const sortedBlogs = responseData.Items.sort(
      (a: { datum: string }, b: { datum: string }) => {
        const dateA = new Date(a.datum);
        const dateB = new Date(b.datum);
        return dateB.getTime() - dateA.getTime();
      }
    );

    return sortedBlogs;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchFourLatestBlog() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogsopenlatest`,
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

export async function fetchBlogIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/blogs/getblog/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchEventIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/getevent/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function getAboutUsDataToken() {
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
        },
        credentials: "include",
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

export async function fetchBlogsToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function fetchUnionDataToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/union/getuniondata`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}

export async function fetchUnionDataIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/getunionid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchGalleriesToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/gallery/getallgalleries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}

export async function fetchGalleryIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/gallery/getgalleryalbum/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchActualJobsToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjobs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}

export async function fetchActualJobIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjob/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchNavbarDataToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/navbar/getnavbarinfodata`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}
export async function fetchNavbarDataIdToken(id: string | undefined) {
  if (id) {
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
          },
          credentials: "include",
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

export async function fetchFaqToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/faq/getfaqdata`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}

export async function fetchFaqIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/faq/getfaq/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchSponsorsToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/sponsors/getsponsors`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}

export async function fetchSponsorIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/sponsors/getsponsor/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchDocsToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/docs/getdocs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.log("error");
      return null;
    }

    const responseData = await response.json();

    const sortedData = responseData.Items.sort((a: any, b: any) => {
      const nameA = a.nazov.toUpperCase();
      const nameB = b.nazov.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return sortedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchDocIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/docs/getdoc/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

    const sortedData = responseData.Items.sort((a: any, b: any) => {
      const nameA = a.nazov.toUpperCase();
      const nameB = b.nazov.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return sortedData;
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

export async function fetchGalleriesYearToken(year: string | undefined) {
  if (year) {
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
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log("error");
        return null;
      }

      const responseData = await response.json();

      const sortedData = responseData.sort((a: any, b: any) => {
        const nameA = a.nazov.toUpperCase();
        const nameB = b.nazov.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      return sortedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    return null;
  }
}

export async function getContactPageToken() {
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
        },
        credentials: "include",
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

export async function fetchAnnouncementsToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/ann/getallann`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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
}

export async function fetchAnnouncements() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/ann/getallannopen`,
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

    const sortedItems = responseData.Items.sort((a: Oznamy, b: Oznamy) => {
      const dateA = convertToDate(a.datum);
      const dateB = convertToDate(b.datum);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedItems;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split(".");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export async function fetchAnnouncementIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/ann/getannid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchAnnouncementSlug(slug: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/ann/getannslug/${slug}`,
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
    throw new Error("Network response was not ok");
  }
}

export async function getActualityPageDataToken() {
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
        },
        credentials: "include",
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

export async function getPoradnaPageToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/poradnapage/getporadnapage/f0ffd755-1463-4342-a8d1-fcaaae32fb18`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function getPoradnaPage() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/poradnapage/getporadnapageopen/f0ffd755-1463-4342-a8d1-fcaaae32fb18`,
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

export async function getZlavyPageToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/zlavypage/getzlavypage/faec1027-3bc0-4bf2-9d0e-cdb1578d9032`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function getZlavyPage() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/zlavypage/getzlavypageopen/faec1027-3bc0-4bf2-9d0e-cdb1578d9032`,
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

export async function getUzitocneLinkyPageToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/uzitocnepage/getuzitocnepage/a4e4c819-685a-443d-aeb1-6232242e6905`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function getUzitocneLinkyPage() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/uzitocnepage/getuzitocnepageopen/a4e4c819-685a-443d-aeb1-6232242e6905`,
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

export async function getPrednaskyPageToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/prednaskypage/getprednaskypage/34d4b87f-604b-4513-9fd6-12467ef92cc3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function getPrednaskyPage() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/prednaskypage/getprednaskypageopen/34d4b87f-604b-4513-9fd6-12467ef92cc3`,
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

export async function fetchDiplomasToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/docs/getdiplomas/c5db7e39-2b24-4276-acfd-317506e3f515`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function fetchDiplomas() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/docs/getdiplomasclient/c5db7e39-2b24-4276-acfd-317506e3f515`,
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

export async function getChildrenPageToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/childrenpage/getchildrenpage/7ae8a22a-3acc-4a47-ba7f-997e69eacb8e`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function getChildrenPageClient() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/childrenpage/getchildrenpageopen/7ae8a22a-3acc-4a47-ba7f-997e69eacb8e`,
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

export async function getGdprPageToken() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/gdpr/getgdprpage/e4c653e5-c664-459f-a984-7a9d3b08d978`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
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

export async function getGdprPage() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/gdpr/getgdprpageopen/e4c653e5-c664-459f-a984-7a9d3b08d978`,
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

export async function fetchSpravodajciToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/spravodajca/getspravodajci`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.log("error");
      return null;
    }

    const responseData = await response.json();

    const final_data = responseData.Items.sort(
      (a: Spravodajca, b: Spravodajca) => {
        if (b.rok !== a.rok) {
          return b.rok - a.rok;
        }
        return b.mesiac - a.mesiac;
      }
    );

    return final_data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchSpravodajciIdToken(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/spravodajca/getspravodajca/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
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

export async function fetchSpravodajciClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/spravodajca/getspravodajciclient`,
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

    const final_data = responseData.Items.sort(
      (a: Spravodajca, b: Spravodajca) => {
        if (b.rok !== a.rok) {
          return b.rok - a.rok;
        }
        return b.mesiac - a.mesiac;
      }
    );

    return final_data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getArchiveEvents(year: string) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/events/getactualeventssorted/${year}/-1/vsetky`,
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
    console.log(error);
    return [];
  }
}

export async function updateCount() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/add-visit`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching visit count:", error);
  }
}

export async function getCount() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/get-visit`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching visit count:", error);
  }
}

export async function uploadFileS3(
  url: string,
  fields: any,
  formData: FormData
) {
  const formDataS3 = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formDataS3.append(key, value as string);
  });

  const final_file = formData.get("file");
  if (final_file instanceof File) {
    formDataS3.append("file", final_file);
  } else {
    console.error("No file found in formData.");
  }

  try {
    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formDataS3,
    });
    console.log(uploadResponse);
  } catch (error) {
    console.log(error);
  }
}
