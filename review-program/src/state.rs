use borsh::{BorshDeserialize, BorshSerialize};
use thiserror::Error;
use solana_program::program_pack::{IsInitialized,Sealed};
use solana_program::program_error::ProgramError;

#[derive(BorshSerialize, BorshDeserialize)]
pub struct AccountState {
    pub is_initialized: bool,
    pub rating: u8,
    pub description: String,
    pub title: String,
    pub location: String,
}

impl Sealed for AccountState {}

impl IsInitialized for AccountState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

#[derive(Debug,Error)]
pub enum ReviewError {
    #[error("Account not initialized")]
    UninitializedAccount,
    #[error("Rating greater than 10 or less than 1")]
    InvalidRating,
    #[error("PDA Error")]
    InvalidPDA,
}

impl From<ReviewError> for ProgramError {
    fn from(e: ReviewError) -> Self{
        ProgramError::Custom(e as u32)
    }
}

