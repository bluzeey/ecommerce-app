import React,{useState,useEffect} from 'react'
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core'
import {useForm,FormProvider} from 'react-hook-form'
import FormInput from './CustomTextField'

import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken}) => {
    const methods=useForm();
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivison] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const fetchShippingCountries=async(checkoutTokenId)=>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        console.log(countries)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }
    const fetchSubdivisions = async (countryCode)=>{
        const {subdivisions}= await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivison(Object.keys(subdivisions)[0])
    }
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    },[])
    useEffect(()=>{
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    },[shippingCountry])
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                       <FormInput required name='firstName' label='First name'/>
                       <FormInput required name='lastName' label='Last name'/>
                       <FormInput required name='address1' label='Address'/>
                       <FormInput required name='email' label='Email'/>
                       <FormInput required name='city' label='City'/>
                       <FormInput required name='zip' label='ZIP / Postal code'/>
                       <Grid item xs={12} sm={6} >
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name])=>((
                            <MenuItem key={code} value={name}>
                                {name}
                            </MenuItem>)))}
                        </Select>
                    </Grid>
                    </Grid>
                    {/*<Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value="" fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>*/}
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
