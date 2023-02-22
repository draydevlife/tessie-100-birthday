import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import downloadPhoto from '../utils/downloadPhoto'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Tessie Ray Celebrates 100 Years</title>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dp36lcvlx/image/upload/v1677035518/TessieRay100Birthday/Tessie100thBirthdayOpenGraph.jpg"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dp36lcvlx/image/upload/v1677035518/TessieRay100Birthday/Tessie100thBirthdayOpenGraph.jpg"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              Tessie Ray's 100th Birthday Celebration
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Tessie (Reed) Ray, a beloved member of the community, celebrated a remarkable 
              milestone on Sunday, January 29th - her 100th birthday! This gallery features 
              tributes to Tessie and her loved ones as well as the full collection of photos
              gathered for the celebration.
            </p>
            <button
              onClick={() =>
                downloadPhoto(
                  `https://api.cloudinary.com/v1_1/dp36lcvlx/auto/generate_archive?api_key=477318432788123&flatten_folders=true&keep_derived=true&mode=create_and_download&signature=980b8f05638659b4845fd4f879633a0ad235112e&source_url=https%3A%2F%2Fcloudinary-tmp.s3.amazonaws.com%2Fgenerate_archive%2Fdp36lcvlx%2Fbf0e9020-202b-4f81-942c-ca951c938a2e%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DASIATMIIPIN22MLLABTF%252F20230222%252Fus-east-1%252Fs3%252Faws4_request%26X-Amz-Date%3D20230222T035309Z%26X-Amz-Expires%3D60%26X-Amz-Security-Token%3DIQoJb3JpZ2luX2VjEDQaCXVzLWVhc3QtMSJIMEYCIQChaHk80I2Q0atEwMBaSs3pqg3IG4AOwC1zwdvizDa%252FKwIhAIyXsCgAx3TeUmTMf6GCvu4hSvYY34L1VzXhlU%252B808EoKtUECM3%252F%252F%252F%252F%252F%252F%252F%252F%252F%252FwEQABoMMjMyNDgyODgyNDIxIgzcMF%252FC%252BlUMfXdII9gqqQTz5uEofU4J8Z%252BhUQ1g3gS2atsDUpyqDDWh77S3mwu00HomkrsJGbpBQKgric3qjuxz2zNRuKwcnQofHV%252BaHF7U2mHwribN84EqcnUwYaCaaWGSzlFRUPdlsthnJCaruLwsmcopTN8%252F%252FDS432Hf%252F%252FBpdSFFem%252BnrBVro%252Bx2X%252F5SMdiHgoK%252F6bP8lu4UMsYCjqt5VWhtUjeESk4LXeJDeVPQp4Ot3Vj7RVle9xufBSpPG2mxih38y2gqPIIhZF6pPDa551C7T2MNjSG21QgJbWDas4MLxpclhndIw65g%252FaU4gbFhlW0cfQ9t3vCganxVlcUOB3TTfNJXfMZVouT0zP6UtEHIrtJsFdzslHcc84cyz8JGgKDPT0LDNV6smoyJ7Sg8Is9VPkjzwmBKYVzkklup8jy9uSqYfYCHJXzaf32tAhxRqTvDOXJRP4JwENEDX8AJqQJ0rUT1yw%252F0d%252B56khlTKMMi9LjNspDo256ouftpRHtQ%252BPnt3%252FK3gZHrveGvL26K2WaucD1ZmhaQYoLvLMaTRInAtT15AJH4JESVwbxcFofOOuEd1rmvsPIj0P7K7G43ZI6htdHUkaTb1q1bh%252BWt93Gk0W9vOPfGJqlSi%252B9CYpWzsXIPbmaBvtRiqO9RIcTcoPlXknnXoNMfxhjoYNwoq15V9Tij7aSBlcsTJClt2nx9Ic8j4MYoLMErfIyyP5A%252BBAmOJXqQMRnIEVGvF6YK4exMJjllN%252BPZMPWZ1p8GOqgBhSHD5bFX3plTCUO0TiSO%252BCzOkdihwcllwbO7Hxw1yWQxPQ2%252BFIfC3VUdJBtYpjTz0ZROcZ%252BLh6mZNQg%252FGiJCKUBfUgn312VRC3ko13HYnyzkQrOLY971OD4rh4DRbeDXV8oVfES8605wGVsj5hyrbEIzIVeeRDxu0mFfcdWZyjeIRZnFe%252Fo5TRbX%252BPqDLQfweSLfWiAQPvrnVYxNuUUThkrXUNH5nEz2%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3Deb4c758c4a75ec60458960455128c0ee98116cda49a7988b578066cbe5601259&target_asset_folder=generated_public_links&target_filename=collection_of_Tessie+Ray%27s+100th+Birthday_d41d8cd98f00b204e9800998ecf8427e_16c99218a18784fb49d65d8d337d1713.zip&target_public_id=generated_public_links%2Fcollection_of_Tessie+Ray%27s+100th+Birthday_d41d8cd98f00b204e9800998ecf8427e_16c99218a18784fb49d65d8d337d1713.zip&timestamp=1677037989`,
                  null
                )
              }
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
            >
              Download the gallery
            </button>
          </div>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
