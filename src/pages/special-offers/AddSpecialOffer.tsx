// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { toast } from 'react-hot-toast'

// ** Demo Components Imports
import SpecialOfferImageUploader from 'src/views/apps/SpecialOfferImageUploader'
import SpecialOfferArImageUploader from 'src/views/apps/SpecialOfferArImageUploader'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

import { addSpecialOffer } from 'src/store/apps/special-offers'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

import Loading from 'src/utils/backdrop'

const AddProduct = () => {
  // ** States

  const dispatch = useDispatch<AppDispatch>()

  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('')
  const [images, setImages] = useState<File[]>([])
  const [arImages, setArImages] = useState<File[]>([])

  const router = useRouter()

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('status', status)
    formData.append('image_en', images[0])
    arImages.length !== 0 ? formData.append('image_ar', arImages[0]) : null

    setLoading(true)
    dispatch(addSpecialOffer(formData)).then(res => {
      res.payload.response == undefined
        ? toast.success(res.payload.message)
        : toast.error(res.payload.response.data.errors[0])
      router.replace('/special-offers')
    })
  }

  return (
    <DropzoneWrapper>
      <Loading open={loading} />
      <Card>
        <CardHeader title='ADD Special Offer' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='1'>Active</MenuItem>
                    <MenuItem value='0'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider />
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <SpecialOfferImageUploader
                getImage={(value: any) => {
                  setImages(value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <SpecialOfferArImageUploader
                getImage={(value: any) => {
                  setArImages(value)
                }}
              />
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' size='large' color='secondary' variant='outlined' onClick={() => router.back()}>
              Back
            </Button>
          </CardActions>
        </form>
      </Card>
    </DropzoneWrapper>
  )
}

export default AddProduct
